/* eslint-disable import/first */
import express, { Express, Request, Response } from 'express';
import { appPort } from './utils';

const app: Express = express();

app.get('/', (req: Request, res: Response): void => {
  res.status(200).send('Light Bot is Alive');
});

import './events';

app.listen(appPort, () =>
  console.log(`⚡⚡⚡ Light Bot is Alive on PORT: ${appPort}`)
);
