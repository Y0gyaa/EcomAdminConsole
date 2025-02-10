import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as express from "express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["https://ecomadminconsole-front.onrender.com/"], // Allowed origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
    credentials: true, // Allow credentials (e.g., cookies)
    allowedHeaders: "Content-Type, Accept", // Allowed headers
  });
  app.use("/uploads", express.static(join(__dirname, "..", "uploads")));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
