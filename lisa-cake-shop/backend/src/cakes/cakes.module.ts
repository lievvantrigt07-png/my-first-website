import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cake } from './cake.entity.js';
import { CakesController } from './cakes.controller.js';
import { CakesService } from './cakes.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Cake])],
  controllers: [CakesController],
  providers: [CakesService],
})
export class CakesModule {}
