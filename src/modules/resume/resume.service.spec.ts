import { ResumeService } from './resume.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ResumeService', () => {
  let service: ResumeService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ResumeService],
    }).compile();

    service = app.get<ResumeService>(ResumeService);
  });

  describe('getResume()', () => {
    it('should return object', async () => {
      const result = {
        name: 'Eliseu dos Santos'
      };
      expect(service.getResume()).toEqual(result);
    });
  });
});
