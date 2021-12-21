# Common begin
module "execution_role" {
  source = "../common/lambda-execution-roles/basic"

  for_each = local.lambda_role_names

  env              = var.env
  project          = var.project
  lambda_role_name = each.value
}
# Common end

# /event-management/events begin
module "get_events" {
  source = "../common/lambda"

  lambda_name         = "eventManagementGetEvents"
  lambda_iam_role_arn = module.execution_role[local.lambda_names[0]].arn
  env                 = var.env
  project             = var.project
  sls_path            = var.sls_path
  sls_config          = var.sls_config
  env_vars            = var.env_vars
}

data "aws_iam_policy_document" "get_events_policy_document" {
  statement {
    actions   = ["secretsmanager:GetSecretValue"]
    resources = var.secret_arns
  }
}
resource "aws_iam_policy" "get_events_policy" {
  name   = "${var.project}-get-events-lambda-policy-${var.env}"
  policy = data.aws_iam_policy_document.get_events_policy_document.json
}
resource "aws_iam_role_policy_attachment" "get_events_policy_attachment" {
  role       = module.execution_role[local.lambda_names[0]].name
  policy_arn = aws_iam_policy.get_events_policy.arn
}

# -> RDS permissions begin
resource "aws_iam_role_policy_attachment" "get_events_rds_data_full_access_policy_attachment" {
  role       = module.execution_role[local.lambda_names[0]].name
  policy_arn = "arn:aws:iam::aws:policy/AmazonRDSDataFullAccess"
}
# -> RDS permissions end
# /event-management/events end

module "endpoint_lambda_proxy_integration" {
  source = "../common/endpoints/lambda-proxy-integration"

  for_each = {
    events = {
      http_method   = "GET"
      function_name = module.get_events.function_name
      invoke_arn    = module.get_events.invoke_arn
      authorization = null
      authorizer_id = null
    }
  }

  env                    = var.env
  project                = var.project
  rest_api_id            = var.rest_api_id
  rest_api_execution_arn = var.rest_api_execution_arn
  resource_id            = var.resource_ids["events"]
  resource_path          = var.resource_paths["events"]
  http_method            = each.value.http_method
  function_name          = each.value.function_name
  invoke_arn             = each.value.invoke_arn
  authorization          = each.value.authorization
  authorizer_id          = each.value.authorizer_id

  depends_on = [
    module.get_events
  ]
}
