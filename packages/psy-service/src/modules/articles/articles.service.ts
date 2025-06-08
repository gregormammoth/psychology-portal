import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../../entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: Partial<Article>): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async findAll(query: any = {}): Promise<Article[]> {
    return this.articleModel.find(query).exec();
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async findByAuthor(authorId: string): Promise<Article[]> {
    return this.articleModel.find({ authorId }).exec();
  }

  async update(id: string, updateArticleDto: Partial<Article>): Promise<Article> {
    const updatedArticle = await this.articleModel
      .findByIdAndUpdate(id, updateArticleDto, { new: true })
      .exec();
    if (!updatedArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return updatedArticle;
  }

  async remove(id: string): Promise<void> {
    const result = await this.articleModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }

  async incrementViews(id: string): Promise<Article> {
    const article = await this.findOne(id);
    return this.update(id, { views: article.views + 1 });
  }

  async toggleLike(id: string, userId: string): Promise<Article> {
    const article = await this.findOne(id);
    const likedBy = article.likedBy || [];
    const isLiked = likedBy.includes(userId);

    if (isLiked) {
      // Unlike
      const newLikedBy = likedBy.filter(id => id !== userId);
      return this.update(id, {
        likedBy: newLikedBy,
        likes: article.likes - 1,
      });
    } else {
      // Like
      return this.update(id, {
        likedBy: [...likedBy, userId],
        likes: article.likes + 1,
      });
    }
  }

  async updateStatus(id: string, status: 'draft' | 'published' | 'archived'): Promise<Article> {
    return this.update(id, { status });
  }

  async findByTags(tags: string[]): Promise<Article[]> {
    return this.articleModel.find({ tags: { $in: tags } }).exec();
  }

  async findByCategories(categories: string[]): Promise<Article[]> {
    return this.articleModel.find({ categories: { $in: categories } }).exec();
  }
} 