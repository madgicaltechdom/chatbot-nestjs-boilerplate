// swiftchat.module.ts

import { Module } from '@nestjs/common';
import { SwiftchatService } from './swiftchat.service';
import { MessageModule } from 'src/message/message.module'; // Correct the import path as necessary
import { LocalizationModule } from 'src/localization/localization.module';


@Module({
  imports: [ MessageModule,LocalizationModule], // Import MessageModule
  providers: [SwiftchatService],
  exports: [SwiftchatService],
})
export class SwiftchatModule {}
