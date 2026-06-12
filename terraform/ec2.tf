# Instance EC2 - brute, sans user_data
# La configuration sera faite par Ansible
resource "aws_instance" "app" {
  ami           = var.ami_id
  instance_type = var.instance_type

  key_name               = var.key_name
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.app.id]

  # Pas de user_data : Ansible s'occupe de tout
  # Disque root 20 Go (suffisant pour Docker + images)
  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  tags = {
    Name        = "${var.project_name}-ec2"
    Environment = var.environment
  }
}

# IP Elastic (IP fixe qui ne change pas au redémarrage)
# Déclarée APRES l'instance pour éviter les dépendances circulaires
resource "aws_eip" "app" {
  domain   = "vpc"
  instance = aws_instance.app.id

  depends_on = [aws_instance.app]

  tags = {
    Name        = "${var.project_name}-eip"
    Environment = var.environment
  }
}