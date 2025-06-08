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
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || 'auth-service',
          port: parseInt(process.env.AUTH_SERVICE_PORT || '3001'),
        },
      },
      {
        name: 'PSY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PSY_SERVICE_HOST || 'psy-service',
          port: parseInt(process.env.PSY_SERVICE_PORT || '3004'),
        },
      },
    ]),
    AuthModule,
    PsyModule,
    // UserModule,
  ],
})
export class AppModule {} 