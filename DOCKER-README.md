# KV Associates Docker Deployment

This guide explains how to deploy the KV Associates website using Docker, which provides a consistent environment and eliminates API connectivity issues.

## Prerequisites

- Docker installed on your server
- Docker Compose installed on your server
- Domain name pointing to your server (kvassociate.in)
- Basic knowledge of terminal/command line

## Quick Start

For a single-click deployment, simply run:

```bash
chmod +x docker-deploy.sh
./docker-deploy.sh
```

This script will:
1. Create necessary directories
2. Check for environment variables
3. Pull latest code (if using git)
4. Build and start all containers
5. Set up SSL certificates automatically

## Manual Setup

### 1. Configure Environment Variables

Copy the example environment file and update it with your credentials:

```bash
cp .env.docker .env
```

Edit the `.env` file and update the `EMAIL_PASSWORD` with your actual Gmail password.

### 2. Create Required Directories

```bash
mkdir -p nginx/certbot/conf nginx/certbot/www nginx/conf logs
```

### 3. Start the Services

```bash
docker-compose up -d
```

### 4. Set Up SSL Certificates

```bash
docker-compose stop nginx
docker-compose run --rm certbot certonly --webroot -w /var/www/certbot \
  --email kvassociatemarketing@gmail.com -d kvassociate.in -d www.kvassociate.in \
  --agree-tos --no-eff-email --force-renewal
docker-compose start nginx
```

## Architecture

This Docker setup includes:

1. **Backend Service**: Node.js application serving the API
2. **Nginx**: Web server and reverse proxy
3. **Certbot**: Automatic SSL certificate management

### How It Solves API Connectivity Issues

- **No CORS Issues**: The Nginx proxy routes API requests to the backend service
- **Single Domain**: All traffic (frontend and API) goes through the same domain
- **SSL Everywhere**: All connections are secured with SSL
- **Automatic Retries**: The application includes retry mechanisms for failed submissions

## Maintenance

### Viewing Logs

```bash
# View all logs
docker-compose logs

# View logs for a specific service
docker-compose logs backend
docker-compose logs nginx
```

### Updating the Application

To update the application with new code:

```bash
git pull
docker-compose up -d --build
```

### SSL Certificate Renewal

SSL certificates are automatically renewed by the certbot service.

## Troubleshooting

### API Connection Issues

If you experience API connection issues:

1. Check if all containers are running:
   ```bash
   docker-compose ps
   ```

2. Check the backend logs:
   ```bash
   docker-compose logs backend
   ```

3. Verify Nginx configuration:
   ```bash
   docker-compose exec nginx nginx -t
   ```

### Email Sending Issues

If emails are not being sent:

1. Verify the EMAIL_PASSWORD in .env file
2. Check if Gmail's "Less secure app access" is enabled for your account
3. Check backend logs for email errors:
   ```bash
   docker-compose logs backend | grep "Error sending"
   ```

## Security Notes

- The `.env` file contains sensitive information. Keep it secure and never commit it to version control.
- The Docker setup uses secure defaults for Nginx and SSL.
- Regular updates are recommended for security patches.
