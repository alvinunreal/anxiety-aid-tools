# Stage 1: Builder
FROM node:lts-alpine AS builder

WORKDIR /app

# Build argument for Nitro preset (defaults to node-server for Docker)
ARG NITRO_PRESET=node-server

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and pnpm config
COPY package.json pnpm-workspace.yaml .npmrc ./

# Install all dependencies (needed for build)
RUN pnpm install

# Copy all source files
COPY . .

# Override Nitro preset for Docker (cloudflare_pages won't work in Docker)
ENV NITRO_PRESET=${NITRO_PRESET}

# Build the application
RUN pnpm run build

# Stage 2: Runner
FROM node:lts-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files and pnpm config
COPY package.json pnpm-workspace.yaml .npmrc ./

# Install only production dependencies
# Nuxt's .output needs runtime dependencies from node_modules
RUN npm install -g pnpm && \
    pnpm install --prod --ignore-scripts

# Copy built application from builder stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Start the production server
CMD ["node", ".output/server/index.mjs"]
