import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consultation } from '../../entities/consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<Consultation>,
  ) {}

  async create(createConsultationDto: CreateConsultationDto): Promise<Consultation> {
    const createdConsultation = new this.consultationModel(createConsultationDto);
    return createdConsultation.save();
  }

  async findAll(): Promise<Consultation[]> {
    return this.consultationModel.find().exec();
  }

  async findOne(id: string): Promise<Consultation> {
    const consultation = await this.consultationModel.findById(id).exec();
    if (!consultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }
    return consultation;
  }

  async findByPsychologist(psychologistId: string): Promise<Consultation[]> {
    return this.consultationModel.find({ psychologistId }).exec();
  }

  async update(id: string, updateConsultationDto: Partial<Consultation>): Promise<Consultation> {
    const updatedConsultation = await this.consultationModel
      .findByIdAndUpdate(id, updateConsultationDto, { new: true })
      .exec();
    if (!updatedConsultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }
    return updatedConsultation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.consultationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }
  }

  async updateRating(id: string, rating: number): Promise<Consultation> {
    const updatedConsultation = await this.consultationModel
      .findByIdAndUpdate(id, { rating }, { new: true })
      .exec();
    if (!updatedConsultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }
    return updatedConsultation;
  }

  async updateTimeSlots(id: string, timeSlots: string[]): Promise<Consultation> {
    const updatedConsultation = await this.consultationModel
      .findByIdAndUpdate(id, { timeSlots }, { new: true })
      .exec();
    if (!updatedConsultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }
    return updatedConsultation;
  }

  async updateStatus(id: string, status: 'available' | 'unavailable'): Promise<Consultation> {
    const updatedConsultation = await this.consultationModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!updatedConsultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }
    return updatedConsultation;
  }
} 