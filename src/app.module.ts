import { Module } from '@nestjs/common';
import { ZohoSignModule } from './eSign/eSign.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ZohoSignModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
