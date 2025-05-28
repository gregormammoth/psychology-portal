# Microservices Authentication System

This is a microservices-based authentication system built with NestJS, Next.js, Redis, RabbitMQ, and PostgreSQL.

## Architecture

The system consists of the following services:

- **Gateway Service**: API Gateway that handles all incoming requests
- **Auth Service**: Handles user authentication and JWT token management
- **User Service**: Manages user data and operations
- **Web App**: Next.js frontend application

## Prerequisites

- Docker and Docker Compose
- Node.js 18 or later
- npm 8 or later

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/redis-rabbit-jwt.git
cd redis-rabbit-jwt
```

2. Install dependencies:
```bash
npm install
```

3. Start the services using Docker Compose:
```bash
docker-compose up -d
```

This will start all the required services:
- PostgreSQL on port 5432
- Redis on port 6379
- RabbitMQ on port 5672 (management interface on port 15672)
- Gateway Service on port 3003
- Web App on port 3000

## Development

To run the services in development mode:

```bash
npm run dev
```

This will start all services in watch mode with hot reloading.

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/profile` - Get user profile (requires JWT token)

### User Management

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=microservices

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key
```

## License

This project is licensed under the ISC License. 