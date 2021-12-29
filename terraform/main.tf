
module "relational_databases" {
  source = "./modules/relational-databases"

  env     = var.env
  project = var.project
}

module "user_authentication" {
  source = "./modules/user-authentication"

  region     = var.region
  env        = var.env
  project    = var.project
  sls_path   = local.sls_path
  sls_config = local.sls_config
  env_vars = merge(local.env_vars, {
    SECRET_ARN   = module.relational_databases.aurora_serverless_secret_arn
    RESOURCE_ARN = module.relational_databases.aurora_serverless_cluster_arn
  })

  depends_on = [
    module.relational_databases
  ]
}

module "api" {
  source = "./modules/api"

  env            = var.env
  project        = var.project
  user_pool_name = module.user_authentication.user_pool_name

  depends_on = [
    module.user_authentication
  ]
}

module "user_management" {
  source = "./modules/user-management"

  env                    = var.env
  project                = var.project
  rest_api_id            = module.api.rest_api_id
  rest_api_execution_arn = module.api.rest_api_execution_arn
  sls_path               = local.sls_path
  sls_config             = local.sls_config
  env_vars = merge(local.env_vars, {
    CORS_CONFIG  = "secret:${var.project}-cors-config-${var.env}"
    SECRET_ARN   = module.relational_databases.aurora_serverless_secret_arn
    RESOURCE_ARN = module.relational_databases.aurora_serverless_cluster_arn
  })
  secret_arns = [module.api.cors_config_secret_arn]

  resource_ids = {
    user_events = module.api.user_events_resource_id
  }

  resource_paths = {
    user_events = module.api.user_events_resource_path
  }

  depends_on = [
    module.api, module.relational_databases
  ]
}

module "event_management" {
  source = "./modules/event-management"

  env                    = var.env
  project                = var.project
  rest_api_id            = module.api.rest_api_id
  rest_api_execution_arn = module.api.rest_api_execution_arn
  sls_path               = local.sls_path
  sls_config             = local.sls_config
  env_vars = merge(local.env_vars, {
    CORS_CONFIG  = "secret:${var.project}-cors-config-${var.env}"
    SECRET_ARN   = module.relational_databases.aurora_serverless_secret_arn
    RESOURCE_ARN = module.relational_databases.aurora_serverless_cluster_arn
  })
  secret_arns = [module.api.cors_config_secret_arn]

  resource_ids = {
    events = module.api.events_resource_id
  }

  resource_paths = {
    events = module.api.events_resource_path
  }

  depends_on = [
    module.api, module.relational_databases
  ]
}
