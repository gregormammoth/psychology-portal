import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { PageView, PageViewSchema } from './schemas/page-view.schema';
import { UserSession, UserSessionSchema } from './schemas/user-session.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb://admin:psypupel@localhost:27017/psychology_portal?authSource=admin'
      // 'mongodb://admin:psypupel@13.61.155.215:27017/psychology_portal?authSource=admin' // TODO: process.env.MONGODB_URL || 'mongodb://admin:password@mongodb:27017/psychology_portal?authSource=admin'
    ),
    MongooseModule.forFeature([
      { name: PageView.name, schema: PageViewSchema },
      { name: UserSession.name, schema: UserSessionSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AppModule {} 