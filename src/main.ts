import { AppConfig, AppModule } from '@mod/app';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { clusterize } from '@util/clustering';
import { initialize } from '@util/helper';

const { CLUSTERING, PORT } = process.env;

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    AppConfig.getFastifyInstance(),
    { bufferLogs: true }
  );

  initialize(app);

  app.listen(PORT, '0.0.0.0');
};
if (CLUSTERING === 'true') clusterize(bootstrap);
else bootstrap();
