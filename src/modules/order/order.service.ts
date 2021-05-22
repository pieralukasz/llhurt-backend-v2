import { Injectable } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class OrderService {
  getHello(): string {
    return 'Hello World!';
  }
}
