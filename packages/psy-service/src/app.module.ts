import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultationsModule } from './modules/consultations/consultations.module';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: 'mongodb://admin:admin123@mongodb:27017/psy_db?authSource=admin', //configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ConsultationsModule,
    ArticlesModule,
  ],
})
export class AppModule {} 