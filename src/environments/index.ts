require('dotenv');

export default () => ({
  awsBucketName: process.env.AWS_BUCKET_NAME || '',
  awsBucketRegion: process.env.AWS_BUCKET_REGION || '',
  awsAccessKey: process.env.AWS_ACCESS_KEY || '',
  awsSecretKey: process.env.AWS_SECRET_KEY || '',
  projectName: process.env.PROJECT_NAME || 'LLHURT',
  apiVersion: process.env.API_VERSION || 1.0,
  port: parseInt(process.env.PORT, 10) || 3000,
  swaggerPath: process.env.SWAGGER_PATH || 'docs',
  warehouseUrl:
    process.env.WAREHOUSE_URL ||
    'http://magazyn.szlafroki.com/csv/ArkuszZamowien.xml',
  mongoUrl: process.env.MONGO_URL || '',
  jwtUserSecret: process.env.JWT_USER_SECRET || '',
});
