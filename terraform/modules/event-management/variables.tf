variable "env" {
  type = string
}

variable "project" {
  description = "Project name"
  type        = string
}

variable "rest_api_id" {
  type = string
}

variable "rest_api_execution_arn" {
  type = string
}

variable "resource_ids" {
  type = map(string)
}

variable "resource_paths" {
  type = map(string)
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

variable "secret_arns" {
  type = list(any)
}
