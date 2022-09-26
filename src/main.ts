import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();
  await app.listen(9000);
  logger.log(`App in running on the port 9000 ${await app.getUrl()}`);

}
bootstrap();
