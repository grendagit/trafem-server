resource "aws_api_gateway_rest_api" "rest_api" {
  name = "${var.project}-${var.env}"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# /user-management
resource "aws_api_gateway_resource" "user_management" {
  parent_id   = aws_api_gateway_rest_api.rest_api.root_resource_id
  path_part   = "user-management"
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
}

# /user-management/users
resource "aws_api_gateway_resource" "users" {
  parent_id   = aws_api_gateway_resource.user_management.id
  path_part   = "users"
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
}

# /event-management
resource "aws_api_gateway_resource" "event_management" {
  parent_id   = aws_api_gateway_rest_api.rest_api.root_resource_id
  path_part   = "event-management"
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
}

# /event-management/events
resource "aws_api_gateway_resource" "events" {
  parent_id   = aws_api_gateway_resource.event_management.id
  path_part   = "events"
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
}

# /event-management/events/{eventId}
resource "aws_api_gateway_resource" "event_id" {
  parent_id   = aws_api_gateway_resource.event_management.id
  path_part   = "{eventId}"
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
}

# Authorizers begin
resource "aws_api_gateway_authorizer" "cognito_user_pool_authorizer" {
  name            = "CognitoUserPoolAuthorizer"
  type            = "COGNITO_USER_POOLS"
  rest_api_id     = aws_api_gateway_rest_api.rest_api.id
  provider_arns   = data.aws_cognito_user_pools.user_pools.arns
  identity_source = "method.request.header.Authorization"
}
# Authorizers end

# CORS begin
resource "aws_api_gateway_resource" "cors" {
  parent_id   = aws_api_gateway_rest_api.rest_api.root_resource_id
  path_part   = "{cors+}"
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
}
resource "aws_api_gateway_method" "cors" {
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id
  resource_id   = aws_api_gateway_resource.cors.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}
resource "aws_api_gateway_integration" "cors" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  resource_id = aws_api_gateway_resource.cors.id
  http_method = aws_api_gateway_method.cors.http_method
  type        = "MOCK"
}
resource "aws_api_gateway_method_response" "cors" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  resource_id = aws_api_gateway_resource.cors.id
  http_method = aws_api_gateway_method.cors.http_method
  status_code = 200

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Headers" = true
  }

  response_models = {
    "application/json" = "Empty"
  }

  depends_on = [aws_api_gateway_method.cors]
}
resource "aws_api_gateway_integration_response" "cors" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  resource_id = aws_api_gateway_resource.cors.id
  http_method = aws_api_gateway_method.cors.http_method
  status_code = 200

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = "'*'",
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'*'"
  }

  depends_on = [aws_api_gateway_integration.cors, aws_api_gateway_method_response.cors]
}

resource "aws_api_gateway_gateway_response" "response_4xx" {
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id
  response_type = "DEFAULT_4XX"

  response_templates = {
    "application/json" = "{'message':$context.error.messageString}"
  }

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Origin" = "'*'"
  }
}
resource "aws_api_gateway_gateway_response" "response_5xx" {
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id
  response_type = "DEFAULT_5XX"

  response_templates = {
    "application/json" = "{'message':$context.error.messageString}"
  }

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Origin" = "'*'"
  }
}

resource "aws_secretsmanager_secret" "cors_config" {
  name = "${var.project}-cors-config-${var.env}"
}
# CORS end

resource "aws_api_gateway_deployment" "rest_api" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id

  # triggers = {
  #   redeployment = "${timestamp()}" # enforces redeployment
  # }

  lifecycle {
    create_before_destroy = true
  }
}
resource "aws_api_gateway_stage" "rest_api" {
  deployment_id = aws_api_gateway_deployment.rest_api.id
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id
  stage_name    = var.env
}
resource "aws_api_gateway_method_settings" "rest_api" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  stage_name  = aws_api_gateway_stage.rest_api.stage_name
  method_path = "*/*"

  settings {
    throttling_rate_limit  = 10000
    throttling_burst_limit = 5000
    logging_level          = "OFF"
  }
}


