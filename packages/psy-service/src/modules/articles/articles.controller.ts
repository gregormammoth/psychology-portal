import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { Article } from '../../entities/article.entity';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  @ApiBearerAuth()
  create(@Body() createArticleDto: Partial<Article>) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, description: 'Return all articles.' })
  findAll(@Query() query: any) {
    return this.articlesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article by id' })
  @ApiResponse({ status: 200, description: 'Return the article.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Get('author/:authorId')
  @ApiOperation({ summary: 'Get articles by author id' })
  @ApiResponse({ status: 200, description: 'Return all articles for the author.' })
  findByAuthor(@Param('authorId') authorId: string) {
    return this.articlesService.findByAuthor(authorId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an article' })
  @ApiResponse({ status: 200, description: 'The article has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateArticleDto: Partial<Article>) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an article' })
  @ApiResponse({ status: 200, description: 'The article has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  @Post(':id/view')
  @ApiOperation({ summary: 'Increment article views' })
  @ApiResponse({ status: 200, description: 'The view count has been incremented.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  incrementViews(@Param('id') id: string) {
    return this.articlesService.incrementViews(id);
  }

  @Post(':id/like')
  @ApiOperation({ summary: 'Toggle article like' })
  @ApiResponse({ status: 200, description: 'The like status has been toggled.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  @ApiBearerAuth()
  toggleLike(@Param('id') id: string, @Body('userId') userId: string) {
    return this.articlesService.toggleLike(id, userId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update article status' })
  @ApiResponse({ status: 200, description: 'The status has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  @ApiBearerAuth()
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'draft' | 'published' | 'archived',
  ) {
    return this.articlesService.updateStatus(id, status);
  }

  @Get('tags/:tags')
  @ApiOperation({ summary: 'Get articles by tags' })
  @ApiResponse({ status: 200, description: 'Return articles matching the tags.' })
  findByTags(@Param('tags') tags: string) {
    const tagArray = tags.split(',');
    return this.articlesService.findByTags(tagArray);
  }

  @Get('categories/:categories')
  @ApiOperation({ summary: 'Get articles by categories' })
  @ApiResponse({ status: 200, description: 'Return articles matching the categories.' })
  findByCategories(@Param('categories') categories: string) {
    const categoryArray = categories.split(',');
    return this.articlesService.findByCategories(categoryArray);
  }
} 