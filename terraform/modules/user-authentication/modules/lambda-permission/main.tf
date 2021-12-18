resource "aws_lambda_permission" "lambda_allow_cognito" {
  statement_id   = "LambdaAllowCognito"
  action         = "lambda:InvokeFunction"
  function_name  = var.lambda_name
  principal      = "cognito-idp.amazonaws.com"
  source_arn     = var.user_pool_arn
  source_account = data.aws_caller_identity.current.account_id
}
