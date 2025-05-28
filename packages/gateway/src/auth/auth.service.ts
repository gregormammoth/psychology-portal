import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async register(registerDto: RegisterDto) {
    return this.authClient.send({ cmd: 'register' }, registerDto);
  }

  async login(loginDto: LoginDto) {
    return this.authClient.send({ cmd: 'login' }, loginDto);
  }

  async validateToken(token: string) {
    return this.authClient.send({ cmd: 'validate_token' }, { token });
  }
} 