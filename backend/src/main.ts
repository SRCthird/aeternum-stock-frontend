import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';

async function bootstrap() {
  const core = await NestFactory.create(CoreModule);
  await core.listen(3000);
}
bootstrap();
