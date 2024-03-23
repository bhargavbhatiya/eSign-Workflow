// zoho-sign.module.ts
import { Module } from '@nestjs/common';
import { ZohoSignController } from './controllers/eSign.controller';
import { ZohoSignService } from './services/zohoSign.service';
import { eSignService } from './services/eSign.sevice';
import { EmailService } from './services/email.service';
import { MailerService } from './services/mailer.service';

@Module({
  controllers: [ZohoSignController],
  providers: [ZohoSignService, eSignService, EmailService, MailerService],
})
export class ZohoSignModule {}
