import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule } from './backend/backend.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MyConfigModule } from './config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_PUBLIC_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    BackendModule,
    MyConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
