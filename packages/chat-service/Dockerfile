FROM node:22.11.0-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/chat-service/package*.json ./packages/chat-service/
COPY packages/chat-service/tsconfig.json ./packages/chat-service/

RUN npm install

COPY packages/chat-service/src ./packages/chat-service/src

RUN npm run build -w @psychology-portal/chat-service

CMD ["npm", "run", "start:prod", "-w", "@psychology-portal/chat-service"] 