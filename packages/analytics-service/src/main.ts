import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('AnalyticsService');

  const app = await NestFactory.create(AppModule);

  const corsOrigins = process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:3000'];

  app.enableCors({
    origin: ['http://psychology-frontend-lb-2-1621481893.eu-north-1.elb.amazonaws.com'], // TODO: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  });

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

  await app.startAllMicroservices();
  logger.log('Analytics microservice started');

  const port = process.env.PORT || 3004;
  await app.listen(port);
  logger.log(`Analytics service listening on port ${port}`);
}

bootstrap().catch((error) => {
  console.error('Failed to start analytics service:', error);
  process.exit(1);
}); 