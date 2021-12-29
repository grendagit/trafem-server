output "rest_api_id" {
  value = aws_api_gateway_rest_api.rest_api.id
}

output "rest_api_arn" {
  value = aws_api_gateway_rest_api.rest_api.arn
}

output "rest_api_execution_arn" {
  value = aws_api_gateway_rest_api.rest_api.execution_arn
}

output "users_resource_id" {
  value = aws_api_gateway_resource.users.id
}
output "users_resource_path" {
  value = aws_api_gateway_resource.users.path
}

output "user_id_resource_id" {
  value = aws_api_gateway_resource.user_id.id
}
output "user_id_resource_path" {
  value = aws_api_gateway_resource.user_id.path
}

output "user_events_resource_id" {
  value = aws_api_gateway_resource.user_events.id
}
output "user_events_resource_path" {
  value = aws_api_gateway_resource.user_events.path
}

output "events_resource_id" {
  value = aws_api_gateway_resource.events.id
}
output "events_resource_path" {
  value = aws_api_gateway_resource.events.path
}

output "event_id_resource_id" {
  value = aws_api_gateway_resource.event_id.id
}
output "event_id_resource_path" {
  value = aws_api_gateway_resource.event_id.path
}

output "cognito_user_pool_authorizer_id" {
  value = aws_api_gateway_authorizer.cognito_user_pool_authorizer.id
}

output "cors_config_secret_arn" {
  value = aws_secretsmanager_secret.cors_config.arn
}
