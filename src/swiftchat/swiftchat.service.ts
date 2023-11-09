import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MessageService } from 'src/message/message.service';
import { LocalizationService } from 'src/localization/localization.service';
import { localisedStrings } from 'src/i18n/Gujrati/localised-strings';
dotenv.config();

@Injectable()
export class SwiftchatService {

  public botId = process.env.BOT_ID;
  public apiKey = process.env.API_KEY;
  public apiUrl = process.env.API_URL;
  public ParentId = process.env.Parent_ID;
  public baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  constructor(
    public readonly messageService: MessageService,
    public readonly localizationService: LocalizationService,

    ) {}

  async sendWelcomeMessage(from: string) {
    try {
      const welcomeMessage = await this.messageService.prepareWelcomeMessage();
      const requestData = {
        to: from,
        type: 'text',
        text: {
          body: welcomeMessage,
        },
      };

      const response = await this.messageService.sendMessage(this.baseUrl, requestData, this.apiKey);
      return response;
    } catch (error) {
      // Handle errors
    }
  }

  async sendButtonMessage(recipientMobile: string,) {
    try {
      
      const newsCategoriesWithSubCategories = await
      this.localizationService.getNewsCategoriesWithSubCategories(this.ParentId);
      const buttons = newsCategoriesWithSubCategories.map((subcategory) => {
        return { type: 'solid', body: subcategory, reply: subcategory };
      });
      const localisedStrings1 = localisedStrings.selectNewsCategory
      console.log("newsCategoriesWithSubCategories",newsCategoriesWithSubCategories)
      console.log(buttons)
      const requestData = {
        to: recipientMobile,
        type: 'button',
        button: {
          body: {
            type: 'text',
            text: {
              body: localisedStrings1,
            },
          },
          buttons: buttons,
          allow_custom_response: false,
        },
      };

      const response = await this.messageService.sendMessage(this.baseUrl, requestData, this.apiKey);
      return response;
    } catch (error) {
      // Handle errors
    }
  }
  
}
