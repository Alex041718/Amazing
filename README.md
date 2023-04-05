## README.md

# Installer nodejs et npm avec nvm :


sudo wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm


nvm install 18.15.0

verrif avec node -v et npm -v


# Dépôt git

sudo apt-get install git

git clone https://github.com/Alex041718/Amazing.git
cd Amazing/
npm i

# Nginx

sudo apt install nginx

sudo nano /etc/nginx/sites-available/api-rest-site.conf
bah dcp je l'ai mis dans /home/debian/Amazing/api-rest-site.conf

```
server {
    listen 80;
    server_name 51.38.35.91;
    root /home/debian/Amazing/site;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_pass unix:/var/run/php/php-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

Créez un lien symbolique dans le répertoire /etc/nginx/sites-enabled/ pour activer le site web :


sudo ln -s /etc/nginx/sites-available/api-rest-site.conf /etc/nginx/sites-enabled/

donc nouvelle commande :
sudo ln -s /home/debian/Amazing/api-rest-site.conf /etc/nginx/sites-enabled/
Verrif config nginx :

sudo nginx -t

Redémarrer nginx :

sudo systemctl restart nginx






# install mp2

npm install pm2@latest -g

pm2 start index.js --name Amazing --watch


pm2 ls

pm2 monit

pm2 plus

# Crontab pour pushProduct.js
0 * * * * /home/debian/.nvm/versions/node/v18.15.0/bin/node /home/debian/Amazing/scripts/pushProduct.js

# Apache2

sudo apt install apache2

sudo nano /etc/apache2/sites-available/000-default.conf
```
    DocumentRoot /home/debian/Amazing/site/
```

````
<Directory /home/debian/Amazing/site/>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Require all granted
    AddType application/x-httpd-php .php
    AddHandler php-script .php
</Directory>
````
sudo systemctl restart apache2


# php local 

php -S localhost:8000