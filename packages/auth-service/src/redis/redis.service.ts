import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client;

  constructor(private configService: ConfigService) {
    this.client = createClient({
      url: `redis://${this.configService.get('REDIS_HOST', 'redis')}:${this.configService.get('REDIS_PORT', 6379)}`,
    });
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, { EX: ttl });
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async setToken(userId: string, token: string): Promise<void> {
    const key = `token:${userId}`;
    await this.set(key, token, 3600); // Token expires in 1 hour
  }

  async getToken(userId: string): Promise<string | null> {
    const key = `token:${userId}`;
    return await this.get(key);
  }
} 