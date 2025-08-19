#!/bin/bash

# KV Associates Docker Deployment Script
# This script automates the deployment of the KV Associates website using Docker

# Print colored output
print_message() {
  GREEN='\033[0;32m'
  YELLOW='\033[1;33m'
  RED='\033[0;31m'
  NC='\033[0m' # No Color
  
  case $2 in
    "info") echo -e "${GREEN}[INFO]${NC} $1" ;;
    "warn") echo -e "${YELLOW}[WARNING]${NC} $1" ;;
    "error") echo -e "${RED}[ERROR]${NC} $1" ;;
    *) echo -e "$1" ;;
  esac
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  print_message "Docker is not installed. Please install Docker first." "error"
  exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
  print_message "Docker Compose is not installed. Please install Docker Compose first." "error"
  exit 1
fi

# Create necessary directories
print_message "Creating required directories..." "info"
mkdir -p nginx/certbot/conf nginx/certbot/www nginx/conf logs

# Check if .env file exists
if [ ! -f .env ]; then
  print_message "Creating .env file..." "info"
  echo "EMAIL_PASSWORD=your_email_password" > .env
  print_message "Please update the EMAIL_PASSWORD in the .env file before continuing." "warn"
  exit 1
fi

# Pull latest changes from git if it's a git repository
if [ -d .git ]; then
  print_message "Pulling latest changes from git..." "info"
  git pull
fi

# Stop any running containers
print_message "Stopping any running containers..." "info"
docker-compose down

# Build and start the containers
print_message "Building and starting containers..." "info"
docker-compose up -d --build

# Initialize SSL certificates if they don't exist
if [ ! -d "nginx/certbot/conf/live" ]; then
  print_message "Initializing SSL certificates..." "info"
  
  # Stop nginx temporarily
  docker-compose stop nginx
  
  # Get the certificates
  docker-compose run --rm certbot certonly --webroot -w /var/www/certbot \
    --email kvassociatemarketing@gmail.com -d kvassociate.in -d www.kvassociate.in \
    --agree-tos --no-eff-email --force-renewal
  
  # Restart nginx
  docker-compose start nginx
fi

print_message "Deployment completed successfully!" "info"
print_message "Your website should now be accessible at https://kvassociate.in" "info"
