import { SwiftchatService } from 'src/swiftchat/swiftchat.service';

import { Injectable } from '@nestjs/common';
import IntentClassifier from '../intent/intent.classifier';

@Injectable()
export class ChatbotService {
  private readonly intentClassifier: IntentClassifier;
  private readonly message: SwiftchatService;

  constructor(intentClassifier: IntentClassifier, message: SwiftchatService) {
    this.intentClassifier = intentClassifier;
    this.message = message;
  }

  public processMessage(message: string, from: string): string {
    const intent = this.intentClassifier.getIntent(message);
    if (intent === 'greeting') {
      this.message.sendWelcomeMessage(from);
      this.message.sendButtonMessage(from);
    } else if (intent === 'button') {
      
      this.message.sendButtonMessage(from);
    }
    return "ok"
  }
}

export default ChatbotService;
