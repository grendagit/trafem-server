resource "aws_cognito_user_pool" "user_pool" {
  name = "${var.project}-user-pool-${var.env}"

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  username_attributes = ["email"]

  admin_create_user_config {
    allow_admin_create_user_only = false
    invite_message_template {
      email_message = "Welcome {username} to Trafem. Password to login is as follows {####}"
      email_subject = "Welcome to Trafem!"
      sms_message   = "Welcome {username} to Trafem. Password to login is as follows {####}"
    }
  }

  auto_verified_attributes = ["email"]

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_message        = "Twój kod weryfikacyjny jest następujący {####}"
    email_subject        = "Twój kod weryfikacyjny Trafem"
  }

  lambda_config {
    create_auth_challenge          = module.create_auth_challenge.arn
    define_auth_challenge          = module.define_auth_challenge.arn
    verify_auth_challenge_response = module.verify_auth_challenge_response.arn
    pre_sign_up                    = module.pre_sign_up.arn
    post_confirmation              = module.post_confirmation.arn
  }

  schema {
    name                     = "email"
    attribute_data_type      = "String"
    required                 = true
    developer_only_attribute = false
    mutable                  = false
    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  schema {
    name                     = "given_name"
    attribute_data_type      = "String"
    required                 = true
    developer_only_attribute = false
    mutable                  = false
    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  schema {
    name                     = "family_name"
    attribute_data_type      = "String"
    required                 = true
    developer_only_attribute = false
    mutable                  = false
    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  password_policy {
    minimum_length = 8

    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true

    temporary_password_validity_days = 7
  }

  user_pool_add_ons {
    advanced_security_mode = "OFF"
  }

  username_configuration {
    case_sensitive = false
  }
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name = "${var.project}-user-pool-client-${var.env}"

  enable_token_revocation = true
  explicit_auth_flows = [
    "ALLOW_CUSTOM_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]
  generate_secret               = false
  prevent_user_existence_errors = "ENABLED"

  user_pool_id = aws_cognito_user_pool.user_pool.id
}

resource "aws_cognito_user_pool_domain" "user_pool_domain" {
  domain = local.domain

  user_pool_id = aws_cognito_user_pool.user_pool.id
}
