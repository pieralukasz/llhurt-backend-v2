import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import config from '@environments';

import { INestApplication } from '@nestjs/common';

class Swagger {
  private readonly config: Omit<OpenAPIObject, 'components' | 'paths'>;
  private readonly customOptions: SwaggerCustomOptions;

  constructor() {
    const { projectName, apiVersion } = config();

    this.config = new DocumentBuilder()
      .setTitle(projectName)
      .setDescription('Project api')
      .setVersion(<string>apiVersion)
      .build();

    this.customOptions = {
      customSiteTitle: projectName,
    };
  }

  activate(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.config);
    SwaggerModule.setup(
      config().swaggerPath,
      app,
      document,
      this.customOptions,
    );
  }
}

export default Swagger;
