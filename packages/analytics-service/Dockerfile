FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/analytics-service/package*.json ./packages/analytics-service/
COPY packages/analytics-service/tsconfig.json ./packages/analytics-service/

RUN npm install

COPY packages/analytics-service/src ./packages/analytics-service/src

RUN npm run build -w @monorepo/analytics-service

EXPOSE 3004

CMD ["npm", "run", "start:prod", "-w", "@monorepo/analytics-service"] 