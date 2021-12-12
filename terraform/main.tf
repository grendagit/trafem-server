module "user-authentication" {
  source = "./modules/user-authentication"

  region     = var.region
  env        = var.env
  project    = var.project
  sls_path   = local.sls_path
  sls_config = local.sls_config
  env_vars   = local.env_vars
}
