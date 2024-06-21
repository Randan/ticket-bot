process.env.NTBA_FIX_319 = '1';

/* eslint-disable import/first */
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { setValue } from 'node-global-storage';
import { appPort, dbMongooseUri, localDbName } from './utils';
import { ILightRecord } from './interfaces';
import { LightRecords } from './schemas';

const app: Express = express();

mongoose.connect(dbMongooseUri);

app.get('/', (req: Request, res: Response): void => {
  res.status(200).send('Light Bot is Alive');
});

import './events';

app.listen(appPort, async () => {
  console.log(`⚡⚡⚡ Light Bot is Alive on PORT: ${appPort}`);

  try {
    const response: ILightRecord[] = await LightRecords.find({
      userIds: { $not: { $size: 0 } },
    });

    setValue(localDbName, response);
  } catch (err) {
    console.error('Failed to update light records', err);
  }
});

import './cron';
