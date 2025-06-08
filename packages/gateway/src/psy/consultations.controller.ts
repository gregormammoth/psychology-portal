import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('psy/consultations')
export class ConsultationsController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.PSY_SERVICE_HOST || '0.0.0.0', // 'psy-service',
        port: parseInt(process.env.PSY_SERVICE_PORT || '3004'),
      },
    });
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() createConsultationDto: any, @Request() req: any) {
    // Add the psychologist ID from the authenticated user
    // createConsultationDto.psychologistId = req.user.id;
    return this.client.send('create_consultation', createConsultationDto);
  }

  @Get()
  async findAll() {
    return this.client.send('find_all_consultations', {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client.send('find_one_consultation', id);
  }

  @Get('psychologist/:psychologistId')
  async findByPsychologist(@Param('psychologistId') psychologistId: string) {
    return this.client.send('find_by_psychologist', psychologistId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateConsultationDto: any) {
    return this.client.send('update_consultation', { id, ...updateConsultationDto });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.client.send('remove_consultation', id);
  }

  @Patch(':id/rating')
  @UseGuards(JwtAuthGuard)
  async updateRating(@Param('id') id: string, @Body('rating') rating: number) {
    return this.client.send('update_consultation_rating', { id, rating });
  }

  @Patch(':id/time-slots')
  @UseGuards(JwtAuthGuard)
  async updateTimeSlots(@Param('id') id: string, @Body('timeSlots') timeSlots: string[]) {
    return this.client.send('update_consultation_time_slots', { id, timeSlots });
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.client.send('update_consultation_status', { id, status });
  }
} 