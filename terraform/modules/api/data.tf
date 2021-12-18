
data "aws_cognito_user_pools" "user_pools" {
  name = var.user_pool_name
}
