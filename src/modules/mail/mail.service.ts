import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@schemas';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async;

  async sendMail() {
    return await this.mailerService.sendMail({
      from: 'e-szlafrok@gmail.com',
      to: 'pieralukasz@gmail.com',
      subject: 'Sending Email via Node.js',
      text: 'That was easy!',
    });
  }
}
