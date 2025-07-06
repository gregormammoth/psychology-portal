FROM node:22.11.0-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./
COPY packages/chat-service/package*.json ./packages/chat-service/
COPY packages/chat-service/tsconfig.json ./packages/chat-service/

RUN npm install

COPY packages/chat-service/src ./packages/chat-service/src

RUN npm run build -w @psychology-portal/chat-service

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

CMD ["npm", "run", "start:prod", "-w", "@psychology-portal/chat-service"] 