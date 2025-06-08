import { IsString, IsNumber, IsArray, IsEnum, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultationDto {
  @ApiProperty({ description: 'The ID of the psychologist' })
  @IsString()
  psychologistId: string;

  @ApiProperty({ description: 'The title of the consultation' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the consultation' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price of the consultation' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'The duration of the consultation in minutes' })
  @IsNumber()
  @Min(15)
  @Max(180)
  duration: number;

  @ApiProperty({ description: 'The available time slots for the consultation' })
  @IsArray()
  @IsString({ each: true })
  timeSlots: string[];

  @ApiProperty({ description: 'The status of the consultation', enum: ['available', 'unavailable'] })
  @IsEnum(['available', 'unavailable'])
  status: 'available' | 'unavailable';

  @ApiProperty({ description: 'The rating of the consultation', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiProperty({ description: 'The total number of reviews', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalReviews?: number;
} 