import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { FaqService } from './faq.service';

export interface FaqQuestionData {
  question: string;
  email: string;
  name?: string;
  category?: string;
}

export interface FaqAnswerData {
  answer: string;
  answeredBy?: string;
  isPublished?: boolean;
  priority?: number;
}

@Controller('api/faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post('questions')
  async createQuestion(@Body() questionData: FaqQuestionData) {
    return this.faqService.createQuestion(questionData);
  }

  @Get('questions')
  async getQuestions(@Query('includeUnpublished') includeUnpublished?: string) {
    const include = includeUnpublished === 'true';
    return this.faqService.getQuestions(include);
  }

  @Get('questions/pending')
  async getPendingQuestions() {
    return this.faqService.getPendingQuestions();
  }

  @Get('questions/published')
  async getPublishedFaqs(@Query('category') category?: string) {
    return this.faqService.getPublishedFaqs(category);
  }

  @Get('questions/:id')
  async getQuestion(@Param('id') id: string) {
    return this.faqService.getQuestion(id);
  }

  @Put('questions/:id/answer')
  async answerQuestion(
    @Param('id') id: string,
    @Body() answerData: FaqAnswerData
  ) {
    return this.faqService.answerQuestion(id, answerData);
  }

  @Put('questions/:id/status')
  async updateQuestionStatus(
    @Param('id') id: string,
    @Body('status') status: string
  ) {
    return this.faqService.updateQuestionStatus(id, status);
  }

  @Put('questions/:id/publish')
  async publishQuestion(
    @Param('id') id: string,
    @Body('isPublished') isPublished: boolean
  ) {
    return this.faqService.publishQuestion(id, isPublished);
  }

  @Put('questions/:id/priority')
  async updatePriority(
    @Param('id') id: string,
    @Body('priority') priority: number
  ) {
    return this.faqService.updatePriority(id, priority);
  }

  @Delete('questions/:id')
  async deleteQuestion(@Param('id') id: string) {
    return this.faqService.deleteQuestion(id);
  }

  @Get('categories')
  async getCategories() {
    return this.faqService.getCategories();
  }
} 