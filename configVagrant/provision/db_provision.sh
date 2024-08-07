# Mise à jour des paquets
sudo apt-get update

# Installer MySQL Server 
sudo apt-get install -y mysql-server

# Configurer le bind address à 0.0.0.0
#sudo sed -i "s/^bind-address\s*=.*$/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf

# Démarrer le service MySQL pour appliquer les changements
sudo systemctl start mysql


sudo mysql -u root << EOF 
sudo systemctl restart mysql

sudo mysql -u root

CREATE DATABASE achats;

CREATE USER 'groupe2'@'%' IDENTIFIED BY '1234';

GRANT ALL ON *.* TO 'groupe2'@'%';

FLUSH PRIVILEGES;
EOF >>