FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/gateway/package*.json ./packages/gateway/
COPY packages/gateway/tsconfig.json ./packages/gateway/

RUN npm install

COPY packages/gateway/src ./packages/gateway/src

RUN npm run build -w @monorepo/gateway

EXPOSE 3000

CMD ["npm", "run", "start", "-w", "@monorepo/gateway"] 