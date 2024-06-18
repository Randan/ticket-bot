import 'dotenv/config';

const appPort: string = process.env.PORT || '';
const dbUrl: string = process.env.DB_URL || '';
const adminId: string = process.env.ADMIN_TG_ID || '';
const dbLightCollection: string = process.env.DB_LIGHT_COLLECTION || '';

const dbMongooseUri: string = dbUrl
  ? dbUrl + '?retryWrites=true&w=majority'
  : '';

export { adminId, appPort, dbLightCollection, dbMongooseUri };
