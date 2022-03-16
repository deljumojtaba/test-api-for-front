import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  const config = new DocumentBuilder()
    .setTitle("Test Vue API")
    .setDescription("The Test API v1 ")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "Bearer",
      bearerFormat: "JWT",
      in: "header",
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
  await app.listen(process.env.PORT || 4001, () => {
    console.log(
      `app running on port ${process.env.PORT} in ${process.env.NODE_ENV}`
    );
  });
}
bootstrap().then(() => {
  console.log(`App successfully started on ${process.env.IP}/docs`);
});
