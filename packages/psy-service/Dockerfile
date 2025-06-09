FROM node:18-alpine

WORKDIR /app

# Copy all monorepo files
COPY . .

# Install dependencies at the root (so workspaces are resolved)
RUN npm install --legacy-peer-deps

# Build the psy-service package
RUN npm run build -w @monorepo/psy-service

# Verify the build output
RUN ls -la packages/psy-service/dist

EXPOSE 3004

CMD ["npm", "run", "start", "-w", "@monorepo/psy-service"] 
# COPY . .

# Install dependencies at the root
# RUN npm install --legacy-peer-deps

# Build the psy-service package
# RUN cd packages/psy-service && npm run build

# EXPOSE 3004

# CMD ["npm", "run", "start", "--prefix", "packages/psy-service"] 