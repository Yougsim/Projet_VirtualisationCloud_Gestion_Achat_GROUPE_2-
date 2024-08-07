#!/bin/bash
# Mise à jour des paquets
sudo apt-get update

# Installation de Java
sudo apt-get install -y default-jdk
# ajout user
sudo useradd -m -U -d /opt/tomcat -s /bin/false tomcat

# Installation de Tomcat
TOMCAT_VERSION=9.0.65
wget https://archive.apache.org/dist/tomcat/tomcat-9/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz
sudo tar xzvf apache-tomcat-${TOMCAT_VERSION}.tar.gz -C /opt/
sudo ln -s /opt/apache-tomcat-${TOMCAT_VERSION} /opt/tomcat

# Configuration des permissions
sudo ufw allow 8080/tcpcd opt
sudo chown -R vagrant:vagrant /opt/apache-tomcat-${TOMCAT_VERSION}
sudo chmod -R 755 /opt/apache-tomcat-${TOMCAT_VERSION}
sudo chmod +x /opt/tomcat/bin/*.sh


# Déploiement de l'application (exemple)
cp -r /vagrant/myapp_source/* /opt/tomcat/webapps/ROOT/

# Configuration du fichier context.xml pour la connexion à la base de données MySQL
cat << EOF | sudo tee /opt/tomcat/conf/context.xml
<Context>
  <Resource name="jdbc/achats" auth="Container" type="javax.sql.DataSource"
            maxTotal="100" maxIdle="30" maxWaitMillis="10000"
            username="groupe2" password="1234"
            driverClassName="com.mysql.cj.jdbc.Driver"
            url="jdbc:mysql://192.168.33.12:3306/achats"/>
</Context>
EOF

# Démarrage de Tomcat
/opt/tomcat/bin/startup.sh
