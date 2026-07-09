# Backend PHP (API) — usado pelo Railway ou qualquer host com Docker.
# Usa o servidor embutido do PHP (sem Apache) — simples e confiável.
FROM php:8.2-cli

# Extensão PDO MySQL (usada pelo config/database.php)
RUN docker-php-ext-install pdo_mysql

# Copia o projeto (o .dockerignore exclui frontend, .git e o dump do banco)
COPY . /app
WORKDIR /app

# Pasta de uploads dos documentos
RUN mkdir -p /app/public/uploads

# Alguns processos em paralelo para atender múltiplas requisições
ENV PHP_CLI_SERVER_WORKERS=4

EXPOSE 8080

# O Railway define a porta na variável PORT
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8080} router.php"]
