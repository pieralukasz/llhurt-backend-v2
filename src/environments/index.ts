export default () => ({
  projectName: process.env.PROJECT_NAME || 'LLHURT',
  apiVersion: process.env.API_VERSION || 1.0,
  port: parseInt(process.env.PORT, 10) || 3000,
  swaggerPath: process.env.SWAGGER_PATH || 'docs',
  warehouseUrl:
    process.env.WAREHOUSE_URL ||
    'http://magazyn.szlafroki.com/csv/ArkuszZamowien.xml',
});
