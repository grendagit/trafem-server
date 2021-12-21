
# Common begin
module "execution_role" {
  source = "../common/lambda-execution-roles/basic"

  for_each = local.lambda_role_names

  env              = var.env
  project          = var.project
  lambda_role_name = each.value
}
# Common end

# Create auth challenge stuff begin
module "create_auth_challenge" {
  source = "../common/lambda"

  lambda_name         = "userAuthenticationCreateAuthChallenge"
  lambda_iam_role_arn = module.execution_role[local.lambda_names[0]].arn
  env                 = var.env
  project             = var.project
  sls_path            = var.sls_path
  sls_config          = var.sls_config
  env_vars            = var.env_vars
}
module "create_auth_challenge_permission" {
  source = "./modules/lambda-permission"

  lambda_name   = module.create_auth_challenge.function_name
  user_pool_arn = aws_cognito_user_pool.user_pool.arn

  depends_on = [
    module.create_auth_challenge
  ]
}

# -> SES permissions begin
data "aws_iam_policy_document" "create_auth_challenge_policy_document" {
  statement {
    actions   = ["ses:SendEmail", "ses:SendRawEmail"]
    resources = ["*"]
  }
}
resource "aws_iam_policy" "create_auth_challenge_policy" {
  name   = "${var.project}-create-auth-challenge-lambda-policy-${var.env}"
  policy = data.aws_iam_policy_document.create_auth_challenge_policy_document.json
}
resource "aws_iam_role_policy_attachment" "create_auth_challenge_policy_attachment" {
  role       = module.execution_role[local.lambda_names[0]].name
  policy_arn = aws_iam_policy.create_auth_challenge_policy.arn
}
# -> SES permissions end
# Create auth challenge stuff end

# Define auth challenge stuff begin
module "define_auth_challenge" {
  source = "../common/lambda"

  lambda_name         = "userAuthenticationDefineAuthChallenge"
  lambda_iam_role_arn = module.execution_role[local.lambda_names[1]].arn
  env                 = var.env
  project             = var.project
  sls_path            = var.sls_path
  sls_config          = var.sls_config
  env_vars            = var.env_vars
}
module "define_auth_challenge_permission" {
  source = "./modules/lambda-permission"

  lambda_name   = module.define_auth_challenge.function_name
  user_pool_arn = aws_cognito_user_pool.user_pool.arn

  depends_on = [
    module.define_auth_challenge
  ]
}
# Define auth challenge stuff end

# Verify auth challenge stuff begin
module "verify_auth_challenge_response" {
  source = "../common/lambda"

  lambda_name         = "userAuthenticationVerifyAuthChallengeResponse"
  lambda_iam_role_arn = module.execution_role[local.lambda_names[2]].arn
  env                 = var.env
  project             = var.project
  sls_path            = var.sls_path
  sls_config          = var.sls_config
  env_vars            = var.env_vars
}
module "verify_auth_challenge_response_permission" {
  source = "./modules/lambda-permission"

  lambda_name   = module.verify_auth_challenge_response.function_name
  user_pool_arn = aws_cognito_user_pool.user_pool.arn

  depends_on = [
    module.verify_auth_challenge_response
  ]
}
# Verify auth challenge stuff end

# Pre sign up stuff begin
module "pre_sign_up" {
  source = "../common/lambda"

  lambda_name         = "userAuthenticationPreSignUp"
  lambda_iam_role_arn = module.execution_role[local.lambda_names[3]].arn
  env                 = var.env
  project             = var.project
  sls_path            = var.sls_path
  sls_config          = var.sls_config
  env_vars            = var.env_vars
}
module "pre_sign_up_permission" {
  source = "./modules/lambda-permission"

  lambda_name   = module.pre_sign_up.function_name
  user_pool_arn = aws_cognito_user_pool.user_pool.arn

  depends_on = [
    module.pre_sign_up
  ]
}
# Pre sign up end

# Post confirmation stuff begin
module "post_confirmation" {
  source = "../common/lambda"

  lambda_name         = "userAuthenticationPostConfirmation"
  lambda_iam_role_arn = module.execution_role[local.lambda_names[4]].arn
  env                 = var.env
  project             = var.project
  sls_path            = var.sls_path
  sls_config          = var.sls_config
  env_vars            = var.env_vars
}
module "post_confirmation_permission" {
  source = "./modules/lambda-permission"

  lambda_name   = module.post_confirmation.function_name
  user_pool_arn = aws_cognito_user_pool.user_pool.arn

  depends_on = [
    module.post_confirmation
  ]
}

# -> RDS permissions begin
resource "aws_iam_role_policy_attachment" "post_confirmation_rds_data_full_access_policy_attachment" {
  role       = module.execution_role[local.lambda_names[4]].name
  policy_arn = "arn:aws:iam::aws:policy/AmazonRDSDataFullAccess"
}
# -> RDS permissions end
# Post confirmation end



