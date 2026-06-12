# IP publique fixe (Elastic IP)
output "ec2_public_ip" {
  description = "IP publique de l'EC2 (à utiliser dans l'inventaire Ansible)"
  value       = aws_eip.app.public_ip
}

# DNS public
output "ec2_public_dns" {
  description = "DNS public de l'EC2"
  value       = aws_instance.app.public_dns
}

# ID de l'instance (utile pour debug AWS)
output "ec2_instance_id" {
  description = "ID de l'instance EC2"
  value       = aws_instance.app.id
}

# Commande SSH prête à l'emploi
output "ssh_command" {
  description = "Commande pour se connecter en SSH"
  value       = "ssh -i ~/.ssh/${var.key_name}.pem ubuntu@${aws_eip.app.public_ip}"
}
