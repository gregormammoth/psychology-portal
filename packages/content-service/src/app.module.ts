import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { User, UserSchema } from './schemas/user.schema';
import { Contact, ContactSchema } from './schemas/contact.schema';

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
    ]),
  ],
  controllers: [UserController, ContactController],
  providers: [UserService, ContactService],
})
export class AppModule {} 