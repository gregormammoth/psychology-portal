FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/auth-service/package*.json ./packages/auth-service/
COPY packages/auth-service/tsconfig.json ./packages/auth-service/

RUN npm install

COPY packages/auth-service/src ./packages/auth-service/src

RUN npm run build -w @monorepo/auth-service

CMD ["npm", "run", "start", "-w", "@monorepo/auth-service"] 