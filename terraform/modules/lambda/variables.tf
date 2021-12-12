variable "env" {
  type = string
}

variable "project" {
  description = "Project name"
  type        = string
}

variable "sls_path" {
  description = "Path to .serverless directory"
  type        = string
}

variable "sls_config" {
  description = "Decoded serverless.yml"
  type        = any
}

variable "env_vars" {
  type = map(any)
}

variable "lambda_name" {
  type = string
}

variable "lambda_iam_role_arn" {
  type = string
}

variable "lambda_runtime" {
  type    = string
  default = "nodejs14.x"
}

variable "lambda_memory_size" {
  type    = number
  default = 128
}

variable "lambda_timeout" {
  type    = number
  default = 3
}
