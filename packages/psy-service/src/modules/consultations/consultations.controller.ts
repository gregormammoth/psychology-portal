import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { ConsultationsService } from './consultations.service';
import { Consultation } from '../../entities/consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@ApiTags('consultations')
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new consultation' })
  @ApiResponse({ status: 201, description: 'The consultation has been successfully created.' })
  // @ApiBearerAuth()
  @MessagePattern('create_consultation')
  create(@Body() createConsultationDto: CreateConsultationDto) {
    console.log('createConsultationDto', createConsultationDto);
    return this.consultationsService.create(createConsultationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all consultations' })
  @ApiResponse({ status: 200, description: 'Return all consultations.' })
  @MessagePattern('find_all_consultations')
  findAll() {
    return this.consultationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a consultation by id' })
  @ApiResponse({ status: 200, description: 'Return the consultation.' })
  @ApiResponse({ status: 404, description: 'Consultation not found.' })
  @MessagePattern('find_one_consultation')
  findOne(@Param('id') id: string) {
    return this.consultationsService.findOne(id);
  }

  @Get('psychologist/:psychologistId')
  @ApiOperation({ summary: 'Get consultations by psychologist id' })
  @ApiResponse({ status: 200, description: 'Return all consultations for the psychologist.' })
  @MessagePattern('find_by_psychologist')
  findByPsychologist(@Param('psychologistId') psychologistId: string) {
    return this.consultationsService.findByPsychologist(psychologistId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a consultation' })
  @ApiResponse({ status: 200, description: 'The consultation has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Consultation not found.' })
  @ApiBearerAuth()
  @MessagePattern('update_consultation')
  update(@Param('id') id: string, @Body() updateConsultationDto: Partial<Consultation>) {
    return this.consultationsService.update(id, updateConsultationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a consultation' })
  @ApiResponse({ status: 200, description: 'The consultation has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Consultation not found.' })
  @ApiBearerAuth()
  @MessagePattern('remove_consultation')
  remove(@Param('id') id: string) {
    return this.consultationsService.remove(id);
  }

  @Patch(':id/rating')
  @ApiOperation({ summary: 'Update consultation rating' })
  @ApiResponse({ status: 200, description: 'The rating has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Consultation not found.' })
  @ApiBearerAuth()
  @MessagePattern('update_consultation_rating')
  updateRating(@Param('id') id: string, @Body('rating') rating: number) {
    return this.consultationsService.updateRating(id, rating);
  }

  @Patch(':id/time-slots')
  @ApiOperation({ summary: 'Update consultation time slots' })
  @ApiResponse({ status: 200, description: 'The time slots have been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Consultation not found.' })
  @ApiBearerAuth()
  @MessagePattern('update_consultation_time_slots')
  updateTimeSlots(@Param('id') id: string, @Body('timeSlots') timeSlots: string[]) {
    return this.consultationsService.updateTimeSlots(id, timeSlots);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update consultation status' })
  @ApiResponse({ status: 200, description: 'The status has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Consultation not found.' })
  @ApiBearerAuth()
  @MessagePattern('update_consultation_status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'available' | 'unavailable',
  ) {
    return this.consultationsService.updateStatus(id, status);
  }
} 