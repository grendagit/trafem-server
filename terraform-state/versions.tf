terraform {
  required_version = ">= 0.13.0"

  required_providers {
    aws = {
      version = ">= 3.60.0"
      source = "hashicorp/aws"
    }
  }
}