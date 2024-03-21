// zoho-sign.module.ts
import { Module } from '@nestjs/common';
import { ZohoSignController } from './controllers/eSign.controller';
import { ZohoSignService } from './services/zohoSign.service';

@Module({
  controllers: [ZohoSignController],
  providers: [ZohoSignService],
})
export class ZohoSignModule {}
