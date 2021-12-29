locals {
  lambda_names = [
    "get-user-events",
  ]
  lambda_role_names = { for lambda_name in local.lambda_names : lambda_name => "${lambda_name}-lambda-execution-role" }
}
