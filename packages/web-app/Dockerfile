FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY packages/web-app/package*.json ./packages/web-app/
COPY packages/web-app/tsconfig.json ./packages/web-app/
COPY packages/web-app/next.config.js ./packages/web-app/
COPY packages/web-app/next-i18next.config.js ./packages/web-app/
COPY packages/web-app/tailwind.config.js ./packages/web-app/
COPY packages/web-app/postcss.config.js ./packages/web-app/

# Copy source files
COPY packages/web-app/src ./packages/web-app/src
COPY packages/web-app/public ./packages/web-app/public

# Install dependencies
RUN npm install

# Set environment to development
ENV NODE_ENV=development

# Start the development server
CMD ["npm", "run", "dev", "-w", "@monorepo/web-app"]