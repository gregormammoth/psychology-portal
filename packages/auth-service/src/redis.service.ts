import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client;

  constructor(private readonly configService: ConfigService) {
    this.client = createClient({
      url: this.configService.get('REDIS_URL', 'redis://localhost:6379'),
    });
    this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async setToken(userId: number, token: string): Promise<void> {
    await this.client.set(`token:${userId}`, token, {
      EX: 3600, // 1 hour expiration
    });
  }

  async getToken(userId: number): Promise<string | null> {
    return this.client.get(`token:${userId}`);
  }

  async removeToken(userId: number): Promise<void> {
    await this.client.del(`token:${userId}`);
  }
} 