import ChatbotService from './chat/chatbot service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { log } from './common/middleware/logger.help';
import { Response } from 'express';

@Controller()
export class AppController {
  UserService: any;
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get('/api/status')
  getStatus(@Res() res: Response) {
    res.status(200).send({
      status: 200,
      message: 'ok',
    });
  }

  @Post('/message')
  async handelUserMessage(@Body() body, @Res() res): Promise<void> {
    try {
      const {text } = body;
       this.chatbotService.processMessage(body);
      log(process.env.BOT_ID,text.body);
      res.send({
        status: 200,
        message: 'Success',
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}
