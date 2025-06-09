import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { PsyModule } from './psy/psy.module';
// import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      // {
      //   name: 'AUTH_SERVICE',
      //   transport: Transport.RMQ,
      //   options: {
      //     urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
      //     queue: 'auth_queue',
      //     queueOptions: {
      //       durable: true,
      //     },
      //   },
      // },
      {
        name: 'PSY_SERVICE',
        transport: Transport.TCP, // Transport.RMQ,
        options: {
          host: process.env.PSY_SERVICE_HOST || 'psy-service',
          port: parseInt(process.env.PSY_SERVICE_PORT || '3004'),
          // urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
          // queue: 'psy_queue',
          // queueOptions: {
          //   durable: true,
          // },
        },
      },
    ]),
    AuthModule,
    PsyModule,
    // UserModule,
  ],
})
export class AppModule {} 