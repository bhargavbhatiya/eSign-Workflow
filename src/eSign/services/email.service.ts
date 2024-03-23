import { Injectable } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailToRole1(role1Email: string) {
    // Logic to send email to role 1 with a button to sign PDF
    const mailOptions = {
      to: role1Email,
      subject: 'Please Sign the Document',
      html: '<p>Please sign the document</p><button>Sign PDF</button>',
    };

    await this.mailerService.sendMail(mailOptions);
  }

  async sendEmailToRole2(role2Email: string) {
    // Logic to send email to role 2 with a button to sign PDF
    const mailOptions = {
      to: role2Email,
      subject: 'Please Sign the Document',
      html: '<p>Please sign the document</p><button>Sign PDF</button>',
    };

    await this.mailerService.sendMail(mailOptions);
  }

  async forwardEmailToRole3(role3Email: string) {
    // Logic to send email to role 3 with a button to sign PDF
    const mailOptions = {
      to: role3Email,
      subject: 'Please Sign the Document',
      html: '<p>Please sign the document</p><button>Sign PDF</button>',
    };

    await this.mailerService.sendMail(mailOptions);
  }
}
