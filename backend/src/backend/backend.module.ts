import { Module } from "@nestjs/common";
import { BackendService } from "./backend.service";
import { BackendController } from "./backend.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Backend } from "./backend.entity";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: "./uploads",
    }),
    TypeOrmModule.forFeature([Backend]),
  ],
  providers: [BackendService],
  controllers: [BackendController],
})
export class BackendModule {}
