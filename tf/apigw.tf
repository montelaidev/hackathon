
resource "aws_api_gateway_rest_api" "api" {
  name = "${var.environment}-hackathon"
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# resource "aws_api_gateway_resource" "api" {
#   parent_id   = aws_api_gateway_rest_api.api.root_resource_id
#   path_part   = ""
#   rest_api_id = aws_api_gateway_rest_api.api.id
# }

resource "aws_api_gateway_method" "api" {
  authorization    = "NONE"
  http_method      = "POST"
  resource_id      = aws_api_gateway_rest_api.api.root_resource_id
  rest_api_id      = aws_api_gateway_rest_api.api.id
  api_key_required = true
}

resource "aws_api_gateway_integration" "api" {
  http_method             = aws_api_gateway_method.api.http_method
  resource_id             = aws_api_gateway_rest_api.api.root_resource_id
  rest_api_id             = aws_api_gateway_rest_api.api.id
  type                    = "HTTP_PROXY"
  integration_http_method = "POST"
  uri                     = "http://${module.worker_node.public_dns[0]}/scan"
}

resource "aws_api_gateway_deployment" "api" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_rest_api.api.root_resource_id,
      aws_api_gateway_method.api.id,
      aws_api_gateway_integration.api.id,
    ]))

  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "api" {
  deployment_id = aws_api_gateway_deployment.api.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = "api"
}


resource "aws_api_gateway_usage_plan" "api" {
  name = "${var.environment}-hackathon"
  api_stages {
    api_id = aws_api_gateway_rest_api.api.id
    stage  = aws_api_gateway_stage.api.stage_name
  }
}

resource "aws_api_gateway_api_key" "api" {
  name = "${var.environment}-hackathon"
}


resource "aws_api_gateway_usage_plan_key" "api" {
  key_id        = aws_api_gateway_api_key.api.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.api.id
}
