process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/* eslint-disable import/first */
import express, { Express, Request, Response } from 'express';
import ticketCron from './cron/ticketCron';
import envCheck from './utils/envCheck';

const app: Express = express();

app.get('/', (req: Request, res: Response): void => {
  res.status(200).send('Ticket Bot is Alive');
});

app.listen(process.env.PORT, async () => {
  console.log(`⚡⚡⚡ Ticket Bot is Alive on PORT: ${process.env.PORT}`);

  envCheck(() => ticketCron.start());
});

