import { Injectable } from '@nestjs/common';
import { localisedStrings } from '../i18n/Gujrati/localised-strings';
import axios from 'axios';
import { CustomException } from '../common/exception/custom.exception';

@Injectable()
export class MessageService {

  async prepareWelcomeMessage() {
    let welcomeMessage = localisedStrings.welcomeMessage
    return welcomeMessage;
  }

  getSeeMoreButtonLabel() {
    let seeMoreMessage = localisedStrings.seeMoreNews
    return seeMoreMessage;
  }

  async sendMessage(baseUrl: string, requestData: any, token: string):Promise<any> {
    try {
      const response = await axios.post(baseUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
