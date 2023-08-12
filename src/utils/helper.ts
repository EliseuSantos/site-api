import { ApiResponseOptions } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { NodeEnv } from '@share/enums';
import { NormalException } from '@/exception';

export const toSwaggerError = (
  exception: NormalException,
  options?: ApiResponseOptions
) => {
  return {
    content: { 'application/json': { example: exception.toJSON() } },
    ...options,
  };
};

export const initialize = (app: INestApplication) => {
  const { BASE_PATH, NODE_ENV } = process.env;

  app.useLogger(app.get(Logger));

  app.enableVersioning();

  if (NODE_ENV === NodeEnv.DEVELOPMENT) app.enableCors();

  if (BASE_PATH && NODE_ENV !== NodeEnv.TEST) app.setGlobalPrefix(BASE_PATH);
};
