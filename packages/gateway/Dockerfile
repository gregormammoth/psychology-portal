FROM node:18-alpine

WORKDIR /app

# Copy all monorepo files (not just package.json)
COPY . .

# Install dependencies at the root (so workspaces are resolved)
RUN npm install --legacy-peer-deps

# Build the gateway package
RUN npm run build -w @monorepo/gateway

# Verify the build output
RUN ls -la packages/gateway/dist

EXPOSE 3003

CMD ["npm", "run", "start", "-w", "@monorepo/gateway"] 