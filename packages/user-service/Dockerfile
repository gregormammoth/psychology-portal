FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/user-service/package*.json ./packages/user-service/
COPY packages/user-service/tsconfig.json ./packages/user-service/

RUN npm install

COPY packages/user-service/src ./packages/user-service/src

RUN npm run build -w @monorepo/user-service

CMD ["npm", "run", "start", "-w", "@monorepo/user-service"] 