// zoho-sign.controller.ts
import { Controller, Get, Post, Body, Param, Res, Query } from '@nestjs/common';
import { ZohoSignService } from '../services/zohoSign.service';
import { Response } from 'express';

@Controller('embeddedsigning')
export class ZohoSignController {
  constructor(private readonly zohoSignService: ZohoSignService) {}

  @Get()
  async getEmbeddedSigningUrl(): Promise<string> {
    return this.zohoSignService.getEmbeddedSigningUrl();
  }

  @Post()
  async createDocument(@Body() data: any): Promise<any> {
    return this.zohoSignService.createDocument(data);
  }

  @Post(':requestId/send-for-signature')
  async sendDocumentForSignature(
    @Param('requestId') requestId: string,
  ): Promise<any> {
    return this.zohoSignService.sendDocumentForSignature(requestId);
  }

  @Get(':requestId/documents/:documentId/pdf')
  async downloadPdf(
    @Param('requestId') requestId: string,
    @Param('documentId') documentId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const pdfBuffer = await this.zohoSignService.downloadPdf(
        requestId,
        documentId,
      );
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
