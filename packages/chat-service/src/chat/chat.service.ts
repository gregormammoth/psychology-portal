import { Injectable } from '@nestjs/common';

export interface User {
  userId: string;
  username: string;
}

export interface Message {
  id: string;
  text: string;
  from: string;
  fromUsername: string;
  timestamp: string;
}

@Injectable()
export class ChatService {
  private activeUsers: Map<string, string> = new Map();

  addUser(userId: string, username: string): void {
    this.activeUsers.set(userId, username);
  }

  removeUser(userId: string): void {
    this.activeUsers.delete(userId);
  }

  getUser(userId: string): string | undefined {
    return this.activeUsers.get(userId);
  }

  getAllUsers(): [string, string][] {
    return Array.from(this.activeUsers.entries());
  }

  createMessage(text: string, from: string, fromUsername: string): Message {
    return {
      id: Date.now().toString(),
      text,
      from,
      fromUsername,
      timestamp: new Date().toISOString(),
    };
  }
} 