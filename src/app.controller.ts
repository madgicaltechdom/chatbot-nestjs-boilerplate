import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './model/query';
import { localisedStrings } from './i18n/en/message';
import { MessageService } from './chat/message.service';
import IntentClassifier from './intent/intent-classifier.service';
import ChatbotService from './intent/Chatbot service';

@Controller()
export class AppController {
  constructor(
    private readonly message: MessageService,
    private readonly intentClassifierService: IntentClassifier,
    private readonly chatbotService: ChatbotService,
    private readonly userService: UserService,
  ) {}

  @Get('/api/status')
  async getStatus() {
    return {
      status: 'ok',
    };
  }

  @Post('/message')
  async handleUserMessage(@Body() body, @Res() res): Promise<void> {
    try {
      const { from, text, type } = body;
      this.chatbotService.processMessage(text, from); // Corrected arguments
      res.send('ok');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
