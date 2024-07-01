import 'dotenv/config';
import cron from 'node-cron';

import pingTicket from '../controllers/pingTicket';

const cronOptions = {
  scheduled: true,
  timezone: process.env.TIMEZONE,
  runOnInit: false,
  name: 'ticketCron',
};

const ticketCron = cron.schedule(
  process.env.CRON_EXPRESSION || '*/10 * * * *',
  () => pingTicket(),
  cronOptions
);

export default ticketCron;
