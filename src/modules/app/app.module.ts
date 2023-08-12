import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  AllExceptionFilter,
  NormalExceptionFilter,
  ValidationExceptionFilter,
} from '@/filter';
import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '@/interceptor/response.interceptor';
import { ResumeModule } from '../resume';

@Module({
  imports: [
    ConfigModule.forRoot(AppConfig.getInitConifg()),
    LoggerModule.forRoot(AppConfig.getLoggerConfig()),
    ResumeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_FILTER, useClass: NormalExceptionFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
        }),
    },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
