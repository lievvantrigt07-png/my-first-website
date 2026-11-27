import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './create-message.dto.js';
import { Message } from './message.entity.js';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  create(data: CreateMessageDto) {
    const newMessage = this.messageRepository.create(data);
    return this.messageRepository.save(newMessage);
  }

  findAll() {
    return this.messageRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
