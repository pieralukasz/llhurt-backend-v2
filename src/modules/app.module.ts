import { Module } from '@nestjs/common';

import AuthorizationModule from './authorization';
import OrderModule from './order';
import WarehouseModule from './warehouse';

@Module({
  imports: [AuthorizationModule, OrderModule, WarehouseModule],
})
export class AppModule {}
