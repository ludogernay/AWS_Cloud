variable "aws_region" {
  description = "Région AWS"
  type        = string
  default     = "eu-west-3"
}

variable "ami_id" {
  description = "AMI Ubuntu 26.04 LTS (eu-west-3)"
  type        = string
  default     = "ami-0be40a46b4111e7f5"
}

variable "instance_type" {
  description = "Type d'instance EC2"
  type        = string
  default     = "t3.micro" # Free tier
}

variable "key_name" {
  description = "Nom de la clé SSH créée dans AWS"
  type        = string
  default     = "devops_it"
}

variable "my_ip" {
  description = "Ton IP publique pour accès SSH (format: x.x.x.x)"
  type        = string
  default     = "0.0.0.0"
}

variable "project_name" {
  description = "Nom du projet (utilisé pour les tags)"
  type        = string
  default     = "doc-it"
}

variable "environment" {
  description = "Environnement (dev, staging, prod)"
  type        = string
  default     = "dev"
}
