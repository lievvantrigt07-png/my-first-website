import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateMessageDto } from './create-message.dto.js';
import { MessagesService } from './messages.service.js';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() data: CreateMessageDto) {
    return this.messagesService.create(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.messagesService.findAll();
  }
}
