import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as express from "express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,PATCH,OPTIONS,HEAD",
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
    next();
  });

  app.enableCors({
    allowedHeaders: "*",
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  });
  app.use(
    "/uploads",
    express.static(join(__dirname, "..", "uploads"), {
      setHeaders: (res, path) => {
        if (
          path.endsWith(".jpg") ||
          path.endsWith(".jpeg") ||
          path.endsWith(".png")
        ) {
          res.setHeader("Content-Type", "image/jpeg"); // Change MIME type accordingly
        }
      },
    }),
  );
  await app.listen(process.env.PORT as string);
}
bootstrap();
