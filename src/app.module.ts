import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { AppController } from './app.controller';
import { MessageService } from './chat/message.service';
import { LocalizationService } from './localization/localization.service';
import { UserService } from './model/query';
import { SwiftchatService } from './swiftchat/swiftchat.service';
import * as dotenv from 'dotenv';
import { databaseConfig } from './config/database-config.service';
import IntentClassifier from './intent/intent-classifier.service';
import ChatbotService from './intent/Chatbot service';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return databaseConfig;
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [
    MessageService,
    LocalizationService,
    IntentClassifier,
    UserService,
    SwiftchatService,
    ChatbotService
  ],
})
export class AppModule {}
