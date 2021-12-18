locals {
  lambda_prefix   = "${var.project}-${var.env}"
  lambda_filename = "${var.sls_path}/${local.lambda_prefix}-${var.lambda_name}.zip"
  lambda_details  = var.sls_config.functions[var.lambda_name]
  lambda_default_env_vars = {
    ENV = var.env
  }
  lambda_env_vars = merge(local.lambda_details.environment, local.lambda_default_env_vars)
}
