import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { CakesService } from './cakes/cakes.service.js';

async function seedCakes() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const cakesService = app.get(CakesService);
    await cakesService.seedSampleCakes();
    console.log('Sample cakes are ready.');
  } finally {
    await app.close();
  }
}

seedCakes().catch((error) => {
  console.error(error);
  process.exit(1);
});
