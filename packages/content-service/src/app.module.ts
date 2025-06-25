import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { User, UserSchema } from './schemas/user.schema';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { Faq, FaqSchema } from './schemas/faq.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL', 'mongodb://admin:password@localhost:27017/psychology_portal?authSource=admin'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Contact.name, schema: ContactSchema },
      { name: Faq.name, schema: FaqSchema },
    ]),
  ],
  controllers: [UserController, ContactController, FaqController],
  providers: [UserService, ContactService, FaqService],
})
export class AppModule {} 