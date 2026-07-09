# Backend PHP (API) — usado pelo Railway ou qualquer host com Docker
FROM php:8.2-apache

# Extensão PDO MySQL (usada pelo config/database.php)
RUN docker-php-ext-install pdo_mysql

# mod_rewrite (usado pelo .htaccess)
RUN a2enmod rewrite

# Copia o projeto (o .dockerignore exclui frontend, .git e o dump do banco)
COPY . /var/www/html/

# Aponta o DocumentRoot para a pasta public/ e prepara a pasta de uploads
RUN sed -ri 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf /etc/apache2/apache2.conf \
    && mkdir -p /var/www/html/public/uploads \
    && chown -R www-data:www-data /var/www/html/public/uploads

EXPOSE 80

# O Railway define a porta na variável PORT; ajusta o Apache para escutá-la
CMD ["sh", "-c", "sed -i \"s/Listen 80/Listen ${PORT:-80}/\" /etc/apache2/ports.conf && sed -i \"s/:80>/:${PORT:-80}>/\" /etc/apache2/sites-available/000-default.conf && apache2-foreground"]
