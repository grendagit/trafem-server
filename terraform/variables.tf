variable "region" {
  description = "AWS region"
  type = string
}

variable "env" {
  type = string
}

variable "project" {
  description = "Project name"
  type = string
}

variable "sls_path" {
  description = "Path to .serverless directory"
  type = string
  default = "../.serverless"
}