import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    graphqlUploadExpress({
      maxFileSize: 10000000,
      maxFiles: 5,
    }),
  );
  await app.listen(3000);
}
bootstrap();
