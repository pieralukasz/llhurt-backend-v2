import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import config from '@environments';

import { format } from 'date-fns';
import { ProductType } from '../../types/ProductType';
import createExcelFile from '../../utils/createExcelFile';
import { User } from '@schemas';
import * as fs from 'fs';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(
    userEmail: string,
    message: string,
    products: ProductType[],
    user: User,
  ) {
    const subject = `${message} z dnia ${format(
      new Date(),
      'MM-dd-yyyy HH:mm',
    )}`;

    // const excelFile = await createExcelFile(products, user, subject);

    return await this.mailerService.sendMail({
      from: config().mailName,
      to: userEmail,
      subject,
      text: 'W załączniku znajduje się plik z wybranym zamówieniem. \nPoczekaj na potwierdzenie zamówienia.',
      attachments: [
        {
          filename: 'order.txt',
          content: JSON.stringify(products),
          contentType: 'text/plain',
        },
      ],
    });
  }
}
