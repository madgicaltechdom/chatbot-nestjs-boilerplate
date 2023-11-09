import {  Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';



@Injectable()
export class LocalizationService {
  
  constructor(@Inject(CACHE_MANAGER) public readonly cacheManager: Cache,) {}



  async getNewsCategories(gujratiParentId: string): Promise<any[]> {
    
   const data=await this.fetchLocalizedStrings(parseInt(gujratiParentId));
    return Object.keys(data);
  }

 



 async getNewsCategoriesWithSubCategories(gujratiParentId: string): Promise<any[]>  {
  const data=await this.fetchLocalizedStrings(parseInt(gujratiParentId));
    return Object.keys(data);
    
  }


async fetchLocalizedStrings(parentId: number): Promise<any> {
  const cacheKey = `parentId-${parentId}`;
  let cachedData = await this.cacheManager.get(cacheKey);
  if (cachedData) {
    console.log('Cache hit');
    return cachedData;
  } else {
      const apiUrl = `https://khabrimedia.com/wp-json/wp/v2/categories?parent=${parentId}`;
      const response = await axios.get(apiUrl);
      const resultObject = response.data.reduce((obj, item) => {
        obj[item.name] = item.id.toString();
        return obj;
      }, {});

      await this.cacheManager.set(cacheKey, resultObject, 12 * 60 * 60);
      console.log('Cache set');
      return resultObject;
    }
  }

}
