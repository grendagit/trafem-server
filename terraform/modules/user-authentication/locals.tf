locals {
  email  = "noreply.${var.project}@gmail.com"
  domain = var.project
  lambda_names = [
    "create-auth-challenge",
    "define-auth-challenge",
    "verify-auth-challenge-response",
    "pre-sign-up"
  ]
  lambda_role_names = { for lambda_name in local.lambda_names : lambda_name => "${lambda_name}-lambda-execution-role" }
}
