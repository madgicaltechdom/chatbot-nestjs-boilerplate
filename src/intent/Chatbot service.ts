import IntentClassifier from './intent-classifier.service';
import { MessageService } from 'src/chat/message.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  private readonly intentClassifier: IntentClassifier;
  private readonly message: MessageService;

  constructor(intentClassifier: IntentClassifier, message: MessageService) {
    this.intentClassifier = intentClassifier;
    this.message = message;
  }

  public processMessage(message: string, from: string): string {
    const intent = this.intentClassifier.getIntent(message);
    if (intent === 'greeting') {
      this.message.sendWelcomeMessage(from);
    } else if (intent === 'farewell') {
      return 'ok bye';
    }
  }
}

export default ChatbotService;
