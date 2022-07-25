import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FilterRequestInterceptor } from "./@application/interceptors/filterRequest.interceptor";
import { AppModule } from "./app.module";
import { ENV } from "./ENV";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FilterRequestInterceptor());


  const config = new DocumentBuilder()
    .setTitle(ENV.API_TITLE)
    .setDescription(ENV.API_DESC)
    .setVersion(ENV.API_VERSION)
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(ENV.PORT);
  app.setGlobalPrefix(ENV.API_PREFIX);
  console.log(`\nBiller running on port ==>`, await app.getUrl(), `\n`);
}
bootstrap();
