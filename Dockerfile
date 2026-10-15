FROM php:8.2-apache

# Install ekstensi PostgreSQL yang dibutuhkan Supabase
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Aktifkan modul rewrite Apache
RUN a2enmod rewrite

# Pastikan hanya modul mpm_prefork yang aktif (Mencegah error 'More than one MPM loaded')
RUN a2dismod mpm_event mpm_worker || true \
    && a2enmod mpm_prefork || true

# Copy seluruh file project ke web root Apache
COPY . /var/www/html/

# Expose port standar
EXPOSE 80

# Jalankan Apache
CMD ["apache2-foreground"]