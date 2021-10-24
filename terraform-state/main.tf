module "terraform-state" {
  source = "./modules/terraform-state"

  region = var.region
  env    = var.env
  project = var.project
}