aws_region      = "ap-southeast-1"
environment     = "dev"
cidr_block      = "16.0.0.0/16"
private_subnets = ["16.0.0.0/24", "16.0.1.0/24", "16.0.2.0/24"]
public_subnets  = ["16.0.10.0/24", "16.0.11.0/24", "16.0.12.0/24"]

node_key_pair = "consensys-hackathon"
