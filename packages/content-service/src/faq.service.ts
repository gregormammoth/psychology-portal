import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq, FaqDocument } from './schemas/faq.schema';

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

@Injectable()
export class FaqService {
  constructor(
    @InjectModel(Faq.name)
    private readonly faqModel: Model<FaqDocument>,
  ) {}

  async createQuestion(questionData: FaqQuestionData) {
    const faq = new this.faqModel({
      ...questionData,
      submittedAt: new Date(),
    });

    const savedFaq = await faq.save();
    return {
      id: savedFaq.id,
      message: 'Question submitted successfully',
      submittedAt: savedFaq.submittedAt,
    };
  }

  async getQuestions(includeUnpublished = false) {
    const filter = includeUnpublished ? {} : { isPublished: true };
    return this.faqModel
      .find(filter)
      .sort({ priority: -1, submittedAt: -1 })
      .exec();
  }

  async getQuestion(id: string) {
    return this.faqModel.findById(id).exec();
  }

  async answerQuestion(id: string, answerData: FaqAnswerData) {
    const updateData = {
      ...answerData,
      answeredAt: new Date(),
      status: 'answered',
    };

    return this.faqModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).exec();
  }

  async updateQuestionStatus(id: string, status: string) {
    return this.faqModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).exec();
  }

  async publishQuestion(id: string, isPublished: boolean) {
    return this.faqModel.findByIdAndUpdate(
      id,
      { isPublished },
      { new: true }
    ).exec();
  }

  async updatePriority(id: string, priority: number) {
    return this.faqModel.findByIdAndUpdate(
      id,
      { priority },
      { new: true }
    ).exec();
  }

  async deleteQuestion(id: string) {
    const faq = await this.faqModel.findByIdAndDelete(id).exec();
    if (!faq) {
      throw new Error('FAQ question not found');
    }
    return { message: 'Question deleted successfully' };
  }

  async getPublishedFaqs(category?: string) {
    const filter: any = { isPublished: true };
    if (category) {
      filter.category = category;
    }

    return this.faqModel
      .find(filter)
      .select('question answer category priority submittedAt')
      .sort({ priority: -1, submittedAt: -1 })
      .exec();
  }

  async getPendingQuestions() {
    return this.faqModel
      .find({ status: 'pending' })
      .sort({ submittedAt: -1 })
      .exec();
  }

  async getCategories() {
    return this.faqModel.distinct('category').exec();
  }
} 