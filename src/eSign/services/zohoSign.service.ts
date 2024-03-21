// zoho-sign.service.ts
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import * as FormData from 'form-data';
import * as fs from 'fs';

@Injectable()
export class ZohoSignService {
  private readonly oauthToken = process.env.OAUTH_TOKEN;

  async getEmbeddedSigningUrl(): Promise<string> {
    const recipientName = '<Recipient-Name>';
    const recipientEmail = '<Recipient-Email>';
    const requestName = '<Request-Name>';
    const filePath = '<File-Path>';

    const actionsJson = {
      recipient_name: recipientName,
      recipient_email: recipientEmail,
      action_type: 'SIGN',
      private_notes: 'Please get back to us for further queries',
      signing_order: 0,
      verify_recipient: true,
      verification_type: 'EMAIL',
      is_embedded: true,
    };

    const documentJson = {
      request_name: requestName,
      expiration_days: 1,
      is_sequential: true,
      email_reminders: true,
      reminder_period: 8,
      actions: [actionsJson],
    };

    const data = {
      requests: documentJson,
    };

    const payload = new FormData();
    if (fs.existsSync(filePath)) {
      const value = fs.createReadStream(filePath);
      payload.append('file', value);
    } else {
      throw new Error('Unable to read file');
    }
    payload.append('data', JSON.stringify(data));

    const headers = {
      Authorization: `Zoho-oauthtoken ${this.oauthToken}`,
    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: payload,
    };

    try {
      const response = await fetch(
        'https://sign.zoho.com/api/v1/requests',
        requestOptions,
      );
      const responseData = await response.json();
      const requestId = responseData.requests.request_id;
      const actionId = responseData.actions[0].action_id;

      const payload2 = new FormData();
      payload2.append('host', 'https://sign.zoho.com');

      const requestOptions2 = {
        method: 'POST',
        headers: headers,
        body: payload2,
      };

      const response2 = await fetch(
        `https://sign.zoho.com/api/v1/requests/${requestId}/actions/${actionId}/embedtoken`,
        requestOptions2,
      );
      const responseData2 = await response2.json();
      return responseData2.sign_url;
    } catch (error) {
      throw new Error('Failed to fetch embedded signing URL');
    }
  }

  async createDocument(data: any): Promise<any> {
    const payload = new FormData();
    payload.append('data', JSON.stringify(data));

    const headers = {
      Authorization: `Zoho-oauthtoken ${this.oauthToken}`,
    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: payload,
    };

    try {
      const response = await fetch(
        'https://sign.zoho.com/api/v1/requests',
        requestOptions,
      );
      return await response.json();
    } catch (error) {
      throw new Error('Failed to create document');
    }
  }

  async sendDocumentForSignature(requestId: string): Promise<any> {
    const headers = {
      Authorization: `Zoho-oauthtoken ${this.oauthToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await fetch(
        `https://sign.zoho.com/api/v1/requests/${requestId}/submit`,
        {
          method: 'POST',
          headers: headers,
        },
      );
      return await response.json();
    } catch (error) {
      throw new Error('Failed to send document for signature');
    }
  }

  async downloadPdf(requestId: string, documentId: string): Promise<Buffer> {
    const headers = {
      Authorization: `Zoho-oauthtoken ${this.oauthToken}`,
    };

    try {
      const response = await fetch(
        `https://sign.zoho.com/api/v1/requests/${requestId}/documents/${documentId}/pdf`,
        {
          method: 'GET',
          headers: headers,
        },
      );

      if (response.status !== 200) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
      }

      return await response.buffer();
    } catch (error) {
      throw new Error(`Failed to download PDF: ${error.message}`);
    }
  }
}
