import { Injectable } from '@nestjs/common';
import { ChatGroq } from '@langchain/groq';
import dotenv from 'dotenv';

dotenv.config();

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
  isAI?: boolean;
}

@Injectable()
export class ChatService {
  private activeUsers: Map<string, string> = new Map();
  private chatModel: ChatGroq;

  constructor() {
    this.chatModel = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      // temperature=1,
      // max_completion_tokens=870,
      // top_p=1,
      // stream=True,
      // stop=None,
    });
  }

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

  createMessage(text: string, from: string, fromUsername: string, isAI: boolean = false): Message {
    return {
      id: Date.now().toString(),
      text,
      from,
      fromUsername,
      timestamp: new Date().toISOString(),
      isAI,
    };
  }

  async generateAIResponse(userMessage: string): Promise<string> {
    try {
      const response = await this.chatModel.invoke([
        {
          role: 'system',
          content: 'You are a helpful AI assistant on psychology portal. Provide support and guidance on psychology related questions. Advice on how to deal with mental health issues. Give advice to book a personal consultation with a psychologist.',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ]);

      return response.content.toString();
    } catch (error) {
      console.error('Error generating AI response:', error);
      return 'I apologize, but I encountered an error while processing your request. Please try again.';
    }
  }
} 