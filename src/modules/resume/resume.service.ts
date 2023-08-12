import { Injectable } from '@nestjs/common';

@Injectable()
export class ResumeService {
  public getResume() {
    return {
      name: 'Eliseu dos Santos'
    };
  }
}
