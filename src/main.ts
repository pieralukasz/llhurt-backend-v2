import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

import Swagger from './utils/swagger';

import config from '@environments';
import Log from './utils/Log';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  new Swagger().activate(app);

  await app
    .listen(config().port)
    .then(() => Log(`Server running on port ${config().port}`));
})();
