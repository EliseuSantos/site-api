import {  ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ResumeController],
  providers: [
    ResumeService,
  ],
})
export class ResumeModule {}
