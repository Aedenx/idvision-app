FROM php:8.2-cli

# Install ekstensi PostgreSQL untuk Supabase
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www/html

# Copy seluruh file proyek
COPY . .

# Jalankan PHP CLI Built-in Server mendengarkan port dari $PORT Railway
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8080}"]