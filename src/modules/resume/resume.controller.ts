import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResumeService } from './resume.service';
import { Controller, Get } from '@nestjs/common';

@ApiTags('Resume')
@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @ApiOperation({
    description: 'Get the app version',
    summary: '',
  })
  @ApiOkResponse({
    description: 'Return data of resume',
  })
  @Get('')
  getResume() {
    return this.resumeService.getResume();
  }
}
