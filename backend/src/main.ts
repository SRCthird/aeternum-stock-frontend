import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common';
import { CoreModule } from './core.module';
import * as fs from 'fs';
import 'dotenv/config';

async function bootstrap() {
  let options: NestApplicationOptions = {abortOnError: false};
  if (process.env.HTTPS === 'true') options.httpsOptions = {
    key: fs.readFileSync(process.env.HTTPS_KEY),
    cert: fs.readFileSync(process.env.HTTPS_CERT),
  };
  const core = await NestFactory.create(CoreModule, {
    ...options,
  });
  core.enableCors();
  core.setGlobalPrefix('api');
  await core.listen(5000);
}
bootstrap()
  .catch((err) => console.error(err));
