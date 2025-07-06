import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('AnalyticsService');

  // Create HTTP application
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Connect microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
      queue: 'psychology_analytics_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  // Start microservice
  await app.startAllMicroservices();
  logger.log('Analytics microservice started');

  // Start HTTP server
  const port = process.env.PORT || 3004;
  await app.listen(port);
  logger.log(`Analytics service listening on port ${port}`);
}

bootstrap().catch((error) => {
  console.error('Failed to start analytics service:', error);
  process.exit(1);
}); 