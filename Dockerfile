FROM php:8.2-apache

# Install ekstensi PostgreSQL untuk Supabase
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Aktifkan mod_rewrite Apache
RUN a2enmod rewrite

# Ubah port bawaan Apache dari 80 ke port dari variabel $PORT Railway
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Copy seluruh isi proyek
COPY . /var/www/html/

# Jalankan Apache
CMD ["apache2-foreground"]