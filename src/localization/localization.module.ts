// localization.module.ts

import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service'; // Update the path to localization service
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports:[CacheModule.registerAsync({
    useFactory: () => ({
      store: redisStore ,
      host: 'localhost', // Redis server host
      port: 6379,         // Redis server port
    }),
  })],
  providers: [LocalizationService],
  exports: [LocalizationService],
})
export class LocalizationModule {}
