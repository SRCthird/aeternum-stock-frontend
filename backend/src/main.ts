import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';

async function bootstrap() {
  const core = await NestFactory.create(CoreModule);
  core.enableCors();
  core.setGlobalPrefix('api');
  await core.listen(5000);
}
bootstrap();
