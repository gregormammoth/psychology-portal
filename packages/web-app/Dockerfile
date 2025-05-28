FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/web-app/package*.json ./packages/web-app/

RUN npm install

COPY packages/web-app/src ./packages/web-app/src
COPY packages/web-app/public ./packages/web-app/public
COPY packages/web-app/next.config.js ./packages/web-app/

RUN npm run build -w @monorepo/web-app

EXPOSE 3000

CMD ["npm", "run", "start", "-w", "@monorepo/web-app"] 