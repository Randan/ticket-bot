/* eslint-disable import/first */
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { appPort, dbMongooseUri, updateLightRecords } from './utils';

const app: Express = express();

mongoose.connect(dbMongooseUri);

app.get('/', (req: Request, res: Response): void => {
  res.status(200).send('Light Bot is Alive');
});

import './events';

app.listen(appPort, () => {
  console.log(`⚡⚡⚡ Light Bot is Alive on PORT: ${appPort}`);
  updateLightRecords();
});

import './cron';

