import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create microservice
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.PSY_SERVICE_HOST || '0.0.0.0',
      port: parseInt(process.env.PSY_SERVICE_PORT || '3004'),
    },
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  // Start microservice
  await app.listen();
}
bootstrap();