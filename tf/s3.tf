resource "aws_s3_bucket" "contractscan" {
  bucket = "${var.environment}-contractscan"
}
