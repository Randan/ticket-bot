import 'dotenv/config';
import cron from 'node-cron';
import { pingIP, removeIPsWOUsers } from '../controllers';

const cronOptions = {
  scheduled: true,
  timezone: process.env.TIMEZONE
};

cron.schedule('0 0 * * *', () => removeIPsWOUsers(), cronOptions);

cron.schedule('* * * * * *', () => pingIP(), cronOptions);
