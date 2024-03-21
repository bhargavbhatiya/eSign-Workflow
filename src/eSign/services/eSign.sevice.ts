import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class eSignService {
  private readonly clientId = process.env.CLIENT_ID;
  private readonly clientSecret = process.env.CLIENT_SECRET;
  private readonly redirectUrl = process.env.REDIRECT_URL;

  async generateGrantToken(): Promise<string> {
    // Step 1: Generate Grant Token
    const response = await fetch(`https://accounts.zoho.com/oauth/v2/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scope: 'ZohoSign.documents.ALL,ZohoSign.templates.ALL',
        client_id: this.clientId,
        state: 'testing',
        response_type: 'code',
        redirect_uri: this.redirectUrl,
        access_type: 'offline',
      }),
    });
    const data = await response.json();
    return data.code;
  }

  async generateAccessAndRefreshToken(
    code: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Step 2: Generate Access and Refresh Token
    const response = await fetch(
      `https://accounts.zoho.com/oauth/v2/token?code=${code}&client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=${this.redirectUrl}&grant_type=authorization_code`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }

  async generateAccessTokenFromRefreshToken(
    refreshToken: string,
  ): Promise<string> {
    // Step 3: Generate Access Token from Refresh Token
    const response = await fetch(
      `https://accounts.zoho.com/oauth/v2/token?refresh_token=${refreshToken}&client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=${this.redirectUrl}&grant_type=refresh_token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    return data.access_token;
  }

  async revokeRefreshToken(refreshToken: string): Promise<void> {
    // Step 4: Revoke Refresh Token
    await fetch(
      `https://accounts.zoho.com/oauth/v2/token/revoke?token=${refreshToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
