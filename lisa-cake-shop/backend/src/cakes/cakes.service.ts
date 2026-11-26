import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cake } from './cake.entity.js';

@Injectable()
export class CakesService {
  constructor(
    @InjectRepository(Cake)
    private readonly cakeRepository: Repository<Cake>,
  ) {}

  findAll() {
    return this.cakeRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async seedSampleCakes() {
    const sampleCakes = [
      {
        name: 'Strawberry Dream',
        description: 'A soft, sweet cake with strawberry flavour.',
        price: 45,
        image: '🍓',
      },
      {
        name: 'Chocolate Delight',
        description: 'A rich chocolate treat for chocolate lovers.',
        price: 50,
        image: '🍫',
      },
      {
        name: 'Vanilla Celebration',
        description: 'A classic vanilla cake for a special occasion.',
        price: 40,
        image: '🧁',
      },
    ];

    for (const cake of sampleCakes) {
      const existingCake = await this.cakeRepository.findOneBy({
        name: cake.name,
      });

      if (!existingCake) {
        await this.cakeRepository.save(cake);
      }
    }
  }
}
