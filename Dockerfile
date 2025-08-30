# Multi-stage build for Nuxt.js static generation with Nginx

# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable

# Copy package files first for better layer caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy configuration files
COPY nuxt.config.ts tailwind.config.ts ./
COPY postcss.config.* ./

# Copy source code
COPY . .

# Set Docker build environment variable
ENV DOCKER_BUILD=true

# Build and generate static files
RUN pnpm run generate

# Stage 2: Nginx production server
FROM nginx:alpine AS production

# Create nginx user for security
RUN addgroup -g 1001 -S nginx-user && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx-user -g nginx-user nginx-user

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set ownership of nginx files
RUN chown -R nginx-user:nginx-user /usr/share/nginx/html && \
    chown -R nginx-user:nginx-user /var/cache/nginx && \
    chown -R nginx-user:nginx-user /var/log/nginx && \
    chown -R nginx-user:nginx-user /etc/nginx/conf.d

# Create pid directory
RUN mkdir -p /run && chown -R nginx-user:nginx-user /run

# Switch to non-root user
USER nginx-user

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]