variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-1"
}

variable "profile" {
  description = "AWS region"
  type        = string
}

variable "cidr_block" {
  type    = string
  default = "16.0.0.0/16"
}

variable "private_subnets" {
  type    = list(string)
  default = ["16.0.0.0/24", "16.0.1.0/24", "16.0.2.0/24"]
}

variable "public_subnets" {
  type    = list(string)
  default = ["16.0.10.0/24", "16.0.11.0/24", "16.0.12.0/24"]
}

variable "node_key_pair" {
  type = string
}

variable "environment" {
  type    = string
  default = "dev"
}
