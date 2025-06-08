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
        uri: configService.get<string>('MONGODB_URI', 'mongodb://admin:admin123@localhost:27017/psy_db?authSource=admin'),
      }),
      inject: [ConfigService],
    }),
    ConsultationsModule,
    ArticlesModule,
  ],
})
export class AppModule {} 