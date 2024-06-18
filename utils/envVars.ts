import 'dotenv/config';

const appPort: string = process.env.PORT || '';
const dbUrl: string = process.env.DB_URL || '';
const adminId: string = process.env.ADMIN_TG_ID || '';
const dbLightCollection: string = process.env.DB_LIGHT_COLLECTION || '';
const localDbName: string = process.env.LOCAL_DB_NAME || '';
const passphrase: string = process.env.PASSPHRASE || '';

const dbMongooseUri: string = dbUrl
  ? dbUrl + '?retryWrites=true&w=majority'
  : '';

export {
  adminId,
  appPort,
  dbLightCollection,
  dbMongooseUri,
  localDbName,
  passphrase,
};
