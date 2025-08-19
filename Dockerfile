# Build stage for frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build the frontend
COPY . .
RUN npm run build

# Production stage for Node.js backend
FROM node:18-alpine AS backend

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built frontend from the build stage
COPY --from=frontend-builder /app/dist ./dist

# Copy server files
COPY server.js .
COPY .env .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["node", "server.js"]
