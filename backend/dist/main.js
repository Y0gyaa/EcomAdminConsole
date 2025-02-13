"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS,HEAD");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
        next();
    });
    app.enableCors({
        allowedHeaders: "*",
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    });
    app.use("/uploads", express.static((0, path_1.join)(__dirname, "..", "uploads"), {
        setHeaders: (res, path) => {
            if (path.endsWith(".jpg") ||
                path.endsWith(".jpeg") ||
                path.endsWith(".png")) {
                res.setHeader("Content-Type", "image/jpeg");
            }
        },
    }));
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map