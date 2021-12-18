output "aurora_serverless_secret_arn" {
  value = aws_secretsmanager_secret.credentials.arn
}

output "aurora_serverless_cluster_arn" {
  value = aws_rds_cluster.cluster.arn
}
