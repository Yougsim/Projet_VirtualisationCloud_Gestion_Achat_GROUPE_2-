
# Mise à jour des packages
sudo apt-get update

# Installation d'Apache
sudo apt-get install -y apache2

# Activation d'Apache
sudo systemctl enable apache2

# Démarrage d'Apache
sudo systemctl start apache2

# Config accès au répertoire de synchronisation
sudo chown -R www-data:www-data /vagrant
sudo chmod -R 755 /vagrant

# Redémarreage d'Apache 
sudo systemctl restart apache2
