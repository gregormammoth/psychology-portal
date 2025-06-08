# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY src ./src

# Debug: Show source files
RUN echo "Source files:" && ls -la src/

# Build the application with verbose output
RUN npm run build --verbose

# Debug: Show dist files
RUN echo "Dist files:" && ls -la dist/

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Debug: Show final files
RUN echo "Final files:" && ls -la && echo "Dist contents:" && ls -la dist/

EXPOSE 3002

# Start the application
CMD ["node", "dist/main"] 