// swiftchat.module.ts

import { Module } from '@nestjs/common';
import { SwiftchatService } from './swiftchat.service';
import { MessageModule } from 'src/message/message.module'; // Correct the import path as necessary
import { LocalizationModule } from 'src/localization/localization.module';
import { KhabriMediaApiService } from 'src/khabri-media-api/khabri-media-api.service';


@Module({
  imports: [ MessageModule,LocalizationModule], // Import MessageModule
  providers: [SwiftchatService,KhabriMediaApiService],
  exports: [SwiftchatService],
})
export class SwiftchatModule {}
