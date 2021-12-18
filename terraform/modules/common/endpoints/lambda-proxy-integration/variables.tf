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

variable "resource_id" {
  type = string
}

variable "resource_path" {
  type = string
}

variable "http_method" {
  type = string
}

variable "authorization" {
  type    = string
  default = null
}

variable "authorizer_id" {
  type    = string
  default = null
}

variable "function_name" {
  type = string
}

variable "invoke_arn" {
  type = string
}
