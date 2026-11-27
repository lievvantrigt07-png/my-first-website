import { Controller, Get } from '@nestjs/common';
import { CakesService } from './cakes.service.js';

@Controller('cakes')
export class CakesController {
  constructor(private readonly cakesService: CakesService) {}

  @Get()
  findAll() {
    return this.cakesService.findAll();
  }
}
