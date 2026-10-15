FROM php:8.2-apache

# Install ekstensi PostgreSQL untuk Supabase
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Matikan event/worker modul secara eksplisit agar tidak konflik dengan prefork
RUN a2dismod mpm_event mpm_worker || true
RUN a2enmod mpm_prefork rewrite

# Konfigurasi Port dinamis Railway
ENV PORT=80
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Copy kode proyek
COPY . /var/www/html/

CMD ["apache2-foreground"]