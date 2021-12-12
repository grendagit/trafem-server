resource "aws_lambda_function" "function" {
  filename      = local.lambda_filename
  function_name = local.lambda_details.name
  role          = lookup(local.lambda_details, "role", var.lambda_iam_role_arn)
  handler       = local.lambda_details.handler

  source_code_hash = filebase64sha256(local.lambda_filename)

  runtime     = var.lambda_runtime
  memory_size = var.lambda_memory_size
  timeout     = var.lambda_timeout

  environment {
    variables = {
      for lambda_env_var in keys(local.lambda_env_vars) : lambda_env_var => lookup(var.env_vars, lambda_env_var, local.lambda_env_vars[lambda_env_var])
    }
  }
}
