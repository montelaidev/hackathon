data "aws_iam_policy" "ecr_read" {
  arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}

data "aws_iam_policy_document" "worker_node_policy_document" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetBucketLocation",
      "s3:ListBucketMultipartUploads"
    ]

    resources = [
      aws_s3_bucket.contractscan.arn
    ]

    effect = "Allow"
  }
  statement {
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:ListMultipartUploadParts",
      "s3:AbortMultipartUpload"

    ]

    resources = [
      "${aws_s3_bucket.contractscan.arn}/*"
    ]

    effect = "Allow"
  }
}


data "aws_iam_policy_document" "worker_node_assume_role_document" {
  statement {
    actions = [
      "sts:AssumeRole"
    ]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}


resource "aws_iam_policy" "worker_node_policy" {
  name   = "${var.environment}-hackathon-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.worker_node_policy_document.json
}

resource "aws_iam_role" "worker_node" {
  name               = "${var.environment}-hackathon-role"
  assume_role_policy = data.aws_iam_policy_document.worker_node_assume_role_document.json
}

resource "aws_iam_role_policy_attachment" "worker_node_policy_attachment_ecr" {
  role       = aws_iam_role.worker_node.name
  policy_arn = data.aws_iam_policy.ecr_read.arn
}

resource "aws_iam_role_policy_attachment" "worker_node_policy_attachment_s3" {
  role       = aws_iam_role.worker_node.name
  policy_arn = aws_iam_policy.worker_node_policy.arn
}

resource "aws_iam_instance_profile" "worker_node_profile" {
  name = "${var.environment}-hackathon-progile"
  role = aws_iam_role.worker_node.name
}
