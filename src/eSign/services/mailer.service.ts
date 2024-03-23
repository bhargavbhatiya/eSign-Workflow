// mailer.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'bhatiyabhargav.bb@gmail.com',
        pass: 'your-password',
      },
    });
  }

  async sendMail(mailOptions: any) {
    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${mailOptions.to} successfully`);
    } catch (error) {
      console.error(`Error sending email to ${mailOptions.to}:`, error);
      throw error; // propagate the error
    }
  }
}
