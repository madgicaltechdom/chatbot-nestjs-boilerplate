import {  Injectable } from '@nestjs/common';
import axios from 'axios';


import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class SwiftchatService {
  
  private botId = process.env.BOT_ID;
  private apiKey = process.env.API_KEY;
  private apiUrl = process.env.API_URL;
  private baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  async sendRequestToswiftChat(requestData: any) {
    try {

      const response = await axios.post(this.baseUrl, requestData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
