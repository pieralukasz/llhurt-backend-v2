import { Controller, Get, Req, Res } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  // @Get()
  // async sendEmail() {
  //   await this.mailService.sendMail();
  // }
}
