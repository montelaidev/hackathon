resource "aws_security_group" "worker_node_sg" {
  name   = "${var.environment}-hackathon-node-sg"
  vpc_id = module.vpc.vpc_id

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 22
    to_port     = 22
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = -1
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

module "worker_node" {
  source                      = "terraform-aws-modules/ec2-instance/aws"
  version                     = "~> 2.0"
  name                        = "${var.environment}-hackathon-node"
  instance_count              = 1
  ami                         = "ami-0c777ba9e7c011e04"
  instance_type               = "t2.micro"
  key_name                    = var.node_key_pair
  monitoring                  = false
  vpc_security_group_ids      = [aws_security_group.worker_node_sg.id]
  subnet_id                   = module.vpc.public_subnets[0]
  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.worker_node_profile.name
  root_block_device = [
    {
      volume_type = "gp2"
      volume_size = 25
    },
  ]
}
