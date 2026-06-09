# Stage 1: Build the React app
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the production bundle
RUN npm run build

# Stage 2: Serve with Caddy
FROM caddy:2-alpine

# Copy built files to Caddy serve directory
COPY --from=builder /app/dist /srv

# Copy custom Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
