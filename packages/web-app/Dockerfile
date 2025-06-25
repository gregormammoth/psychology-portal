FROM node:22.11.0-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/web-app/package*.json ./packages/web-app/
COPY packages/web-app/tsconfig.json ./packages/web-app/
COPY packages/web-app/next-i18next.config.js ./packages/web-app/
COPY packages/web-app/postcss.config.js ./packages/web-app/
COPY packages/web-app/tailwind.config.js ./packages/web-app/

RUN npm install

COPY packages/web-app/src ./packages/web-app/src
COPY packages/web-app/public ./packages/web-app/public
COPY packages/web-app/next.config.js ./packages/web-app/

RUN npm run build -w @monorepo/web-app

# Run the start script
CMD ["npm", "run", "start", "-w", "@monorepo/web-app"] 