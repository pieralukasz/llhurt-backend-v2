import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  async createNewOrder() {
    return 'CREATE NEW ORDER | PENDING';
  }
}
