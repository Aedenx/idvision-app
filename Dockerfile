FROM php:8.2-apache

# Install ekstensi PostgreSQL yang dibutuhkan PHP
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Aktifkan mod_rewrite Apache
RUN a2enmod rewrite

# Copy seluruh isi project ke web root Apache
COPY . /var/www/html/

# Port standar Render
EXPOSE 80