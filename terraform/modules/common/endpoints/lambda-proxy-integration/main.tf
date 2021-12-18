resource "aws_api_gateway_method" "method" {
  rest_api_id   = var.rest_api_id
  resource_id   = var.resource_id
  http_method   = var.http_method
  authorization = coalesce(var.authorization, "NONE")
  authorizer_id = var.authorizer_id
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = var.rest_api_id
  resource_id             = var.resource_id
  http_method             = aws_api_gateway_method.method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.invoke_arn
}

resource "aws_lambda_permission" "lambda_allow_apigw" {
  statement_id  = "LambdaAllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.rest_api_execution_arn}/*/${join("", [aws_api_gateway_method.method.http_method, var.resource_path])}"
}
