import { Module } from '@nestjs/common';
import { ConsultationsController } from './consultations.controller';
// import { ArticlesController } from './articles.controller';

@Module({
  controllers: [ConsultationsController/*, ArticlesController*/],
})
export class PsyModule {} 