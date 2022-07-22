import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ENV } from "./ENV";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(ENV.PORT);
  app.setGlobalPrefix(ENV.API_PREFIX);
  console.log(`\nBiller running on port ==>`, await app.getUrl(), `\n`);
}
bootstrap();
