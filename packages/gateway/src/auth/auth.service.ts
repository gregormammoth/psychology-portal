import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      return await firstValueFrom(this.authClient.send({ cmd: 'register' }, registerDto));
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw new UnauthorizedException('Email already exists');
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      return await firstValueFrom(this.authClient.send({ cmd: 'login' }, loginDto));
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw error;
    }
  }

  async validateToken(token: string) {
    try {
      return await firstValueFrom(this.authClient.send({ cmd: 'validate_token' }, { token }));
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
} 