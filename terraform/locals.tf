locals {
  sls_path = "${path.root}/${var.sls_path}"
  env_vars = {
    ENV : var.env
  }
  sls_config = yamldecode(file("${var.sls_path}/serverless.yml"))
}
