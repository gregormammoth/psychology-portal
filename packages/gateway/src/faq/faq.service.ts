import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FaqQuestionData, FaqAnswerData } from './faq.controller';

@Injectable()
export class FaqService {
  constructor(
    @Inject('CONTENT_SERVICE') private readonly contentClient: ClientProxy,
  ) {}

  async createQuestion(questionData: FaqQuestionData) {
    return this.contentClient.send({ cmd: 'create_faq_question' }, questionData).toPromise();
  }

  async getQuestions(includeUnpublished?: boolean) {
    return this.contentClient.send({ cmd: 'get_faq_questions' }, { includeUnpublished }).toPromise();
  }

  async getPendingQuestions() {
    return this.contentClient.send({ cmd: 'get_pending_faq_questions' }, {}).toPromise();
  }

  async getPublishedFaqs(category?: string) {
    return this.contentClient.send({ cmd: 'get_published_faqs' }, { category }).toPromise();
  }

  async getQuestion(id: string) {
    return this.contentClient.send({ cmd: 'get_faq_question' }, { id }).toPromise();
  }

  async answerQuestion(id: string, answerData: FaqAnswerData) {
    return this.contentClient.send({ cmd: 'answer_faq_question' }, { id, answerData }).toPromise();
  }

  async updateQuestionStatus(id: string, status: string) {
    return this.contentClient.send({ cmd: 'update_faq_status' }, { id, status }).toPromise();
  }

  async publishQuestion(id: string, isPublished: boolean) {
    return this.contentClient.send({ cmd: 'publish_faq_question' }, { id, isPublished }).toPromise();
  }

  async updatePriority(id: string, priority: number) {
    return this.contentClient.send({ cmd: 'update_faq_priority' }, { id, priority }).toPromise();
  }

  async deleteQuestion(id: string) {
    return this.contentClient.send({ cmd: 'delete_faq_question' }, { id }).toPromise();
  }

  async getCategories() {
    return this.contentClient.send({ cmd: 'get_faq_categories' }, {}).toPromise();
  }
} 