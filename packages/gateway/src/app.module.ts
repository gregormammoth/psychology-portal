import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ContactModule,
    FaqModule,
    AnalyticsModule,
  ],
})
export class AppModule {} 