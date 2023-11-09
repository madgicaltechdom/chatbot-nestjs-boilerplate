import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MessageService } from 'src/message/message.service';
import { LocalizationService } from 'src/localization/localization.service';
import { localisedStrings } from 'src/i18n/Gujrati/localised-strings';
import { KhabriMediaApiService } from 'src/khabri-media-api/khabri-media-api.service';
import { newsCarouselNextButtons,endDropDownButtons } from 'src/i18n/Gujrati/button';
import { Card } from 'src/card/card.interface';
dotenv.config();

@Injectable()
export class SwiftchatService {

  public botId = process.env.BOT_ID;
  public apiKey = process.env.API_KEY;
  public apiUrl = process.env.API_URL;
  public ParentId = process.env.Parent_ID;
  public khabrimedia_image = process.env.khabrimedia_image;
  public baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  constructor(
    public readonly messageService: MessageService,
    public readonly localizationService: LocalizationService,
    public readonly khabriMediaApiService: KhabriMediaApiService,

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
  async sendNewsAsArticleCarousel(body): Promise<any> {
    const { from: recipientMobile, button_response="",persistent_menu_response="" } = body;
  const responseBody =persistent_menu_response||button_response
    try {
      const categoryId = await this.localizationService.getNewsCategories(this.ParentId, responseBody.body);
    
  
      const articles = await this.khabriMediaApiService.fetchPostsByCategory(categoryId, 1, 10);
     
  
      if (articles.length === 0) {
        console.log('No news articles found.');
        return 0;
      }
  
      const truncatedTags = responseBody.body;
      const cards: Card[] = [];
  
      for (let i = 0; i < +articles.length && cards.length < 10; i++) {
        const article = articles[i];
        const thumbnailUrl = encodeURI(article.yoast_head_json?.og_image?.[0]?.url || this.khabrimedia_image);
        const hasWebpExtension = thumbnailUrl?.endsWith('.webp');
        const cleanedString = article.excerpt.rendered.replace(/<\/?p>/g, '');
        const maxLength = 100;
        const  truncatedTitle= article.title.rendered.length > maxLength
        ? article.title.rendered.substring(0, maxLength - 3) + '...'
        : article.title.rendered;
        const card: Card = {
          tags: [truncatedTags],
          title: truncatedTitle,
          description: cleanedString,
          actions: [
            {
              button_text: 'Read More',
              type: 'website',
              website: {
                title: 'Read More',
                payload: article.link,
                url: article.link,
              },
            },
          ],
        };
  
        if (!hasWebpExtension) {
          card.header = {
            type: 'image',
            image: {
              url: thumbnailUrl,
              body: 'Sample caption',
            },
          };
        }
  
        cards.push(card);
      }
  
      const cardMessageData = {
        to: recipientMobile,
        type: 'article',
        article: cards,
      };
     
      const response = await this.messageService.sendMessage(this.baseUrl, cardMessageData, this.apiKey);
     
      return response;
    } catch (error) {
      console.error('Error fetching and sending news as a card carousel:', error);
      return 0;
    }
  }
  
  async sendHandleButton(
   body
  ): Promise<void> {
    const { from, button_response } = body;
   
    const categoryId = await this.localizationService.getNewsCategories(this.ParentId, button_response.body);
    console.log("categoryId",categoryId);
    const articles = await this.khabriMediaApiService.fetchPostsByCategory(categoryId, 1, 10);
 
    const cardlength= articles.length
  const  MessageType= cardlength<10?localisedStrings.noMoreNewsAvailable(button_response.body):localisedStrings.seeMore
  const  buttons= cardlength<10?endDropDownButtons(button_response.body):newsCarouselNextButtons()
    console.log("cardlength",cardlength);
    const requestBody = {
      to: from,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: MessageType,
          },
        },
        buttons:buttons,
        allow_custom_response: false,
      },
    };
    console.log("response",buttons);
    const response = await this.messageService.sendMessage(this.baseUrl, requestBody, this.apiKey); 
    console.log("response",response);
   return response
  }
}
