import { NestFactory } from '@nestjs/core';
require('./polyfill');
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { INestApplication, INestExpressApplication } from '@nestjs/common';
// somewhere in your initialization file
const port = 8084;
export let app: INestApplication & INestExpressApplication;
export async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(ApplicationModule);
    app.use(helmet());
    app.enableCors();
    const options = new DocumentBuilder()
      .setTitle('24wings ')
      .setDescription('24wings Api Description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    await app.listen(port, () => console.log(`server is running on ${port}`));
    return app;
  } else {
    return app;
  }
}
bootstrap();
