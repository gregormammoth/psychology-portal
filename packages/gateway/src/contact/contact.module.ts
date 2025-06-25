import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONTENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
          queue: 'psychology_content_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {} 