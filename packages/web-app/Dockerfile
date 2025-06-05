FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/web-app/package*.json ./packages/web-app/
COPY packages/web-app/tsconfig.json ./packages/web-app/
COPY packages/web-app/typeorm.config.ts ./packages/web-app/

# Install dependencies including dev dependencies for migrations
RUN npm install

COPY packages/web-app/src ./packages/web-app/src
COPY packages/web-app/public ./packages/web-app/public
COPY packages/web-app/next.config.js ./packages/web-app/

# Build the application
RUN npm run build -w @monorepo/web-app

# Create a script to run migrations
RUN echo '#!/bin/sh\n\
echo "Running migrations..."\n\
node ./node_modules/typeorm/cli.js migration:run -d ./packages/auth-service/dist/typeorm.config.js\n\
echo "Starting service..."\n\
npm run start -w @monorepo/web-app' > /app/start.sh && chmod +x /app/start.sh

# Run the start script
CMD ["sh", "/app/start.sh"] 