import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class KhabriMediaApiService {    
  async fetchPostsByCategory(categoryId: any, page: number, perPage: number) {
    try {
      const response = await axios.get('https://khabrimedia.com/wp-json/wp/v2/posts', {
        params: {
          categories: categoryId,
          page: page,
          per_page: perPage,
        },
      });

      return response.data; // You can return the response data or handle it as needed
    } catch (error) {
    
      throw error; // You can re-throw the error or handle it differently based on your needs
    }
  }
}