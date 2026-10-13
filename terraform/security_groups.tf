resource "aws_security_group" "app" {
  name        = "${var.project_name}-sg"
  description = "Security group for application"
  vpc_id      = aws_vpc.main.id

  # HTTP
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SSH - restreint à ton IP uniquement
  ingress {
    description = "SSH depuis mon IP"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.my_ip}/28"]
  }

  # Grafana - accès restreint à ton IP
  ingress {
    description = "Grafana"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["${var.my_ip}/28"]
  }

  # Tout le trafic sortant autorisé
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-sg"
    Environment = var.environment
  }
}
