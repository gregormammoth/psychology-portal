FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/content-service/package*.json ./packages/content-service/
COPY packages/content-service/tsconfig.json ./packages/content-service/

RUN npm install

COPY packages/content-service/src ./packages/content-service/src

RUN npm run build -w @monorepo/content-service

CMD ["npm", "run", "start", "-w", "@monorepo/content-service"] 