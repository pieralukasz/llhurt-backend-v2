import { Module } from '@nestjs/common';
import { AuthorizationModule, OrderModule } from './modules';

@Module({
  imports: [AuthorizationModule, OrderModule],
})
export class AppModule {}
