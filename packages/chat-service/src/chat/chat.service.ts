import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatGroq } from '@langchain/groq';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { Message, MessageDocument } from '../schemas/message.schema';
import dotenv from 'dotenv';

dotenv.config();

export interface User {
  userId: string;
  username: string;
}

export interface MessageInterface {
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

  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {
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

  async createMessage(text: string, from: string, fromUsername: string, isAI: boolean = false): Promise<MessageInterface> {
    const messageData = {
      text,
      from,
      fromUsername,
      isAI,
      sessionId: from,
      timestamp: new Date(),
    };

    const savedMessage = await this.messageModel.create(messageData);

    return {
      id: savedMessage.id.toString(),
      text: savedMessage.text,
      from: savedMessage.from,
      fromUsername: savedMessage.fromUsername,
      timestamp: savedMessage.timestamp.toISOString(),
      isAI: savedMessage.isAI,
    };
  }

  async getMessageHistory(userId: string, limit: number = 10): Promise<MessageInterface[]> {
    const messages = await this.messageModel
      .find({ sessionId: userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .exec();

    return messages.reverse().map(msg => ({
      id: msg.id.toString(),
      text: msg.text,
      from: msg.from,
      fromUsername: msg.fromUsername,
      timestamp: msg.timestamp.toISOString(),
      isAI: msg.isAI,
    }));
  }

  async generateAIResponse(userMessage: string, userId: string): Promise<string> {
    const username = this.getUser(userId) || 'there';
    const messageHistory = await this.getMessageHistory(userId, 5);
    
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
        ...messageHistory.slice(-5).map(msg => 
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