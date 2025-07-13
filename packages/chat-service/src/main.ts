import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new IoAdapter(app));

  // const corsOrigins = process.env.CORS_ORIGINS 
  //   ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  //   : ['http://localhost:3000'];

  app.enableCors({
    origin: ['http://psychology-frontend-lb-2-1621481893.eu-north-1.elb.amazonaws.com'], // TODO: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  });
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT || 3001, '0.0.0.0');
  console.log(`Chat service running on port ${process.env.PORT || 3001}`);
}

bootstrap(); 