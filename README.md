## README.md

# Installer nodejs et npm avec nvm :


sudo wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm


sudo nvm install --

verrif avec node -v et npm -v


# Dépôt git

sudo apt-get install git

sudo git clone https://github.com/Alex041718/Amazing.git

# Nginx

sudo apt install nginx

sudo nano /etc/nginx/sites-available/api-rest-site.conf


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

Verrif config nginx :

sudo nginx -t

Redémarrer nginx :

sudo systemctl restart nginx







