import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FaqService, FaqQuestionData, FaqAnswerData } from './faq.service';

@Controller('faq')
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

  // Microservice message patterns
  @MessagePattern({ cmd: 'create_faq_question' })
  async handleCreateQuestion(@Payload() data: FaqQuestionData) {
    return this.faqService.createQuestion(data);
  }

  @MessagePattern({ cmd: 'get_faq_questions' })
  async handleGetQuestions(@Payload() data: { includeUnpublished?: boolean }) {
    return this.faqService.getQuestions(data.includeUnpublished);
  }

  @MessagePattern({ cmd: 'get_published_faqs' })
  async handleGetPublishedFaqs(@Payload() data: { category?: string }) {
    return this.faqService.getPublishedFaqs(data.category);
  }

  @MessagePattern({ cmd: 'get_faq_question' })
  async handleGetQuestion(@Payload() data: { id: string }) {
    return this.faqService.getQuestion(data.id);
  }

  @MessagePattern({ cmd: 'answer_faq_question' })
  async handleAnswerQuestion(@Payload() data: { id: string; answerData: FaqAnswerData }) {
    return this.faqService.answerQuestion(data.id, data.answerData);
  }

  @MessagePattern({ cmd: 'update_faq_status' })
  async handleUpdateStatus(@Payload() data: { id: string; status: string }) {
    return this.faqService.updateQuestionStatus(data.id, data.status);
  }

  @MessagePattern({ cmd: 'publish_faq_question' })
  async handlePublishQuestion(@Payload() data: { id: string; isPublished: boolean }) {
    return this.faqService.publishQuestion(data.id, data.isPublished);
  }

  @MessagePattern({ cmd: 'delete_faq_question' })
  async handleDeleteQuestion(@Payload() data: { id: string }) {
    return this.faqService.deleteQuestion(data.id);
  }

  @MessagePattern({ cmd: 'get_faq_categories' })
  async handleGetCategories() {
    return this.faqService.getCategories();
  }

  @MessagePattern({ cmd: 'get_pending_faq_questions' })
  async handleGetPendingQuestions() {
    return this.faqService.getPendingQuestions();
  }

  @MessagePattern({ cmd: 'update_faq_priority' })
  async handleUpdatePriority(@Payload() data: { id: string; priority: number }) {
    return this.faqService.updatePriority(data.id, data.priority);
  }
} 