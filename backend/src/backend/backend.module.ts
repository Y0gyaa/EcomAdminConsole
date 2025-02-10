import { Module } from '@nestjs/common';
import { BackendService } from './backend.service';
import { BackendController } from './backend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Backend } from './backend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Backend])],
  providers: [BackendService],
  controllers: [BackendController],
})
export class BackendModule {}
