import { IsString, IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateConsultationDto {
  @ApiProperty({ description: 'The title of the consultation' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the consultation' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price of the consultation' })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ description: 'The duration of the consultation in minutes' })
  @IsNumber()
  @Min(15)
  @Max(180)
  @Type(() => Number)
  duration: number;

  @ApiProperty({ description: 'The type of consultation', enum: ['online', 'offline'] })
  @IsEnum(['online', 'offline'])
  type: 'online' | 'offline';

  @ApiProperty({ description: 'The ID of the psychologist', required: false })
  @IsOptional()
  @IsString()
  psychologistId: string = '';

  @ApiProperty({ description: 'The status of the consultation', enum: ['available', 'unavailable'], default: 'available' })
  @IsOptional()
  @IsEnum(['available', 'unavailable'])
  status: 'available' | 'unavailable' = 'available';

  @ApiProperty({ description: 'The available time slots for the consultation', required: false })
  @IsOptional()
  @IsString({ each: true })
  timeSlots?: string[] = [];

  @ApiProperty({ description: 'The rating of the consultation', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number = 0;

  @ApiProperty({ description: 'The total number of reviews', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalReviews?: number = 0;
}