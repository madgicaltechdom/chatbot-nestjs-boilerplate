import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { AppController } from './app.controller';
import { UserService } from './model/query';
import * as dotenv from 'dotenv';
import { databaseConfig } from './config/database-config.service';
import { APP_FILTER } from '@nestjs/core';
import { LoggingService } from './common/middleware/logger.middleware';
import { SwiftchatModule } from './swiftchat/swiftchat.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { ChatbotModule } from './chat/chatbot.module';
import { MessageModule } from './message/message.module';
import { KhabriMediaApiService } from './khabri-media-api/khabri-media-api.service';
import { LocalizationModule } from './localization/localization.module';

dotenv.config();

@Module({
  imports: [LocalizationModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return databaseConfig;
      },
    }),
    TypeOrmModule.forFeature([User]),
    MessageModule,
    ChatbotModule,
    SwiftchatModule
    
  ],
  controllers: [AppController],
  providers: [
    LoggingService,
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
      
    },
    KhabriMediaApiService,
    
    
  ],
})
export class AppModule {}
