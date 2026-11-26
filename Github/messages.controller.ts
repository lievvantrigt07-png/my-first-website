import { Body, Controller, Post } from '@nestjs/common';
import { CreateMessageDto } from './create-message.dto.js';
import { MessagesService } from './messages.service.js';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() data: CreateMessageDto) {
    return this.messagesService.create(data);
  }
}
