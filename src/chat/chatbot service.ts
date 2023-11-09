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

  public async processMessage(body): Promise<string> {
    const { from, type } = body;
    console.log(body);
    let intent;
  
    switch (type) {
      case 'text':
        intent =  this.intentClassifier.getIntent(body.text.body);
        break;
      case 'button_response':
        intent =  this.intentClassifier.getIntent(type);
        break;
      case 'persistent_menu_response':
        intent =  this.intentClassifier.getIntent(type);
        break;
      default:
        console.error('Unknown message type:', type);
        break;
    }
  
    if (intent === 'greeting') {
      await this.message.sendWelcomeMessage(from);
      await this.message.sendButtonMessage(from);
    } else if (intent === 'button_response') {
      await this.message.sendNewsAsArticleCarousel(body);
      await this.message.sendHandleButton(body);
    } else if (intent === 'Topnews') {
      await this.message.sendNewsAsArticleCarousel(body);
      await this.message.sendButtonMessage(from);
    }
  
    return "ok";
  }
  
}

export default ChatbotService;
