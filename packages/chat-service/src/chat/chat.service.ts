import { Injectable } from '@nestjs/common';
import { ChatGroq } from '@langchain/groq';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
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
  private messageHistory: Map<string, Message[]> = new Map();

  constructor() {
    this.chatModel = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      temperature: 0.7,
      maxTokens: 150,
      topP: 0.9,
    });
  }

  addUser(userId: string, username: string): void {
    this.activeUsers.set(userId, username);
    this.messageHistory.set(userId, []);
  }

  removeUser(userId: string): void {
    this.activeUsers.delete(userId);
    this.messageHistory.delete(userId);
  }

  getUser(userId: string): string | undefined {
    return this.activeUsers.get(userId);
  }

  getAllUsers(): [string, string][] {
    return Array.from(this.activeUsers.entries());
  }

  createMessage(text: string, from: string, fromUsername: string, isAI: boolean = false): Message {
    const message = {
      id: Date.now().toString(),
      text,
      from,
      fromUsername,
      timestamp: new Date().toISOString(),
      isAI,
    };

    // Store message in history if it's from a user
    if (!isAI && from !== 'ai') {
      const userHistory = this.messageHistory.get(from) || [];
      this.messageHistory.set(from, [...userHistory, message]);
    }

    return message;
  }

  async generateAIResponse(userMessage: string, userId: string): Promise<string> {
    const username = this.getUser(userId) || 'there';
    const userHistory = this.messageHistory.get(userId) || [];
    
    try {
      const systemPrompt = `You are a helpful AI assistant on psychology portal. 
        Give brief, supportive responses (max 100 words) to mental health questions.
        Provide support and guidance on psychology related questions. 
        Advice on how to deal with mental health issues. 
        When appropriate, suggest booking a consultation through our contacts page for personalized professional help. 
        Always address the user by their name (${username}) in your responses.
        Consider the context of previous messages when providing responses.`;

      const messages = [
        new SystemMessage(systemPrompt),
        // Include last 5 messages for context
        ...userHistory.slice(-5).map(msg => 
          msg.isAI ? new AIMessage(msg.text) : new HumanMessage(msg.text)
        ),
        new HumanMessage(userMessage),
      ];

      const response = await this.chatModel.invoke(messages);
      return response.content.toString();
    } catch (error) {
      console.error('Error generating AI response:', error);
      return `I apologize ${username}, but I encountered an error while processing your request. Please try again.`;
    }
  }
}