FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY next-i18next.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Copy source files
COPY src ./src
COPY public ./public

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]