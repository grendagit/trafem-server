# Create auth challenge stuff begin
module "create_auth_challenge" {
  source = "../lambda"

  lambda_name         = "userAuthenticationCreateAuthChallenge"
  lambda_iam_role_arn = module.create_auth_challenge_execution_role.arn
  env                 = var.env
  project             = var.project
  sls_path            = var.sls_path
  sls_config          = var.sls_config
  env_vars            = var.env_vars
}

module "create_auth_challenge_execution_role" {
  source = "./modules/lambda-execution-role"

  env              = var.env
  project          = var.project
  lambda_role_name = "create-auth-challenge-lambda-execution-role"

}

module "create_auth_challenge_permission" {
  source = "./modules/lambda-permission"

  lambda_name           = module.create_auth_challenge.function_name
  cognito_user_pool_arn = aws_cognito_user_pool.user_pool.arn
}

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
  role       = module.create_auth_challenge_execution_role.name
  policy_arn = aws_iam_policy.create_auth_challenge_policy.arn
}
# Create auth challenge stuff end

# Define auth challenge stuff begin
module "define_auth_challenge" {
  source = "../lambda"

  lambda_name         = "userAuthenticationDefineAuthChallenge"
  lambda_iam_role_arn = module.define_auth_challenge_execution_role.arn
  env                 = var.env
  project             = var.project
  sls_path            = var.sls_path
  sls_config          = var.sls_config
  env_vars            = var.env_vars
}

module "define_auth_challenge_execution_role" {
  source = "./modules/lambda-execution-role"

  env              = var.env
  project          = var.project
  lambda_role_name = "define-auth-challenge-lambda-execution-role"
}

module "define_auth_challenge_permission" {
  source = "./modules/lambda-permission"

  lambda_name           = module.define_auth_challenge.function_name
  cognito_user_pool_arn = aws_cognito_user_pool.user_pool.arn
}
# Define auth challenge stuff end

# Verify auth challenge stuff begin
module "verify_auth_challenge_response" {
  source = "../lambda"

  lambda_name         = "userAuthenticationVerifyAuthChallengeResponse"
  lambda_iam_role_arn = module.verify_auth_challenge_response_execution_role.arn
  env                 = var.env
  project             = var.project
  sls_path            = var.sls_path
  sls_config          = var.sls_config
  env_vars            = var.env_vars
}

module "verify_auth_challenge_response_execution_role" {
  source = "./modules/lambda-execution-role"

  env              = var.env
  project          = var.project
  lambda_role_name = "verify-auth-challenge-response-lambda-execution-role"
}

module "verify_auth_challenge_response_permission" {
  source = "./modules/lambda-permission"

  lambda_name           = module.verify_auth_challenge_response.function_name
  cognito_user_pool_arn = aws_cognito_user_pool.user_pool.arn
}
# Verify auth challenge stuff end

# Pre sign up stuff begin
module "pre_sign_up" {
  source = "../lambda"

  lambda_name         = "userAuthenticationPreSignUp"
  lambda_iam_role_arn = module.pre_sign_up_execution_role.arn
  env                 = var.env
  project             = var.project
  sls_path            = var.sls_path
  sls_config          = var.sls_config
  env_vars            = var.env_vars
}

module "pre_sign_up_execution_role" {
  source = "./modules/lambda-execution-role"

  env              = var.env
  project          = var.project
  lambda_role_name = "pre-sign-up-lambda-execution-role"
}

module "pre_sign_up_permission" {
  source = "./modules/lambda-permission"

  lambda_name           = module.pre_sign_up.function_name
  cognito_user_pool_arn = aws_cognito_user_pool.user_pool.arn
}
# Pre sign up end
