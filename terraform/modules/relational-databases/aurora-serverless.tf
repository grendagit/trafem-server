resource "aws_rds_cluster" "cluster" {
  cluster_identifier = "${var.project}-${local.aurora_serverless_name}-${var.env}"
  engine             = "aurora-postgresql"
  engine_mode        = "serverless"

  database_name   = var.project
  master_username = "postgres"
  master_password = random_password.master_password.result

  scaling_configuration {
    auto_pause               = true
    seconds_until_auto_pause = 300
    min_capacity             = 2
    max_capacity             = 4
    timeout_action           = "RollbackCapacityChange"
  }

  enable_http_endpoint = true

  deletion_protection = false

  skip_final_snapshot = true
}

resource "random_password" "master_password" {
  length  = 16
  special = false
}

# TODO: integrate with AWS KMS
resource "aws_secretsmanager_secret" "credentials" {
  name = "rds-db-credentials/${aws_rds_cluster.cluster.cluster_resource_id}/${aws_rds_cluster.cluster.master_username}"
}

resource "aws_secretsmanager_secret_version" "credentials" {
  secret_id = aws_secretsmanager_secret.credentials.id

  secret_string = <<EOF
{
  "dbInstanceIdentifier": "${aws_rds_cluster.cluster.cluster_identifier}",
  "engine": "${aws_rds_cluster.cluster.engine}",
  "host": "${aws_rds_cluster.cluster.endpoint}",
  "port": "${aws_rds_cluster.cluster.port}",
  "resourceId": ${aws_rds_cluster.cluster.cluster_resource_id},
  "username": "${aws_rds_cluster.cluster.master_username}",
  "password": "${random_password.master_password.result}"
}
EOF
}

resource "null_resource" "scripts" {
  depends_on = [aws_rds_cluster.cluster]

  triggers = {
    scripts = sha1(file("${path.module}/scripts.sql"))
  }

  provisioner "local-exec" {
    command = "aws rds-data execute-statement --database ${aws_rds_cluster.cluster.database_name} --resource-arn ${aws_rds_cluster.cluster.arn} --secret-arn ${aws_secretsmanager_secret.credentials.arn} --sql ${"\"$(< ${path.module}/scripts.sql)\""}"
  }
}
