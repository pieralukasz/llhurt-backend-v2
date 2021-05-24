import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import config from '@environments';

@Injectable()
export class ImageService {
  private s3: any;

  constructor() {
    this.s3 = this.getS3();
  }

  getS3() {
    return new AWS.S3({
      region: config().awsBucketRegion,
      accessKeyId: config().awsAccessKey,
      secretAccessKey: config().awsSecretKey,
      signatureVersion: 'v4',
    });
  }

  async getImage() {
    const downloadParams = {
      Key: 'test.jpg',
      Bucket: config().awsBucketName,
    };

    return this.s3.getObject(downloadParams).createReadStream();
  }
}
