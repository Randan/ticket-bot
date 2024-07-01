import { Message } from 'node-telegram-bot-api';
import bot from '../bot';

import stopPingTicket from '../controllers/stopPingTicket';
import startPingTicket from '../controllers/startPingTicket';

const events: Record<string, RegExp> = {
  start: /\/start/,
  stop: /\/stop/,
};

bot.onText(
  events.start,
  async (msg: Message): Promise<void> =>
    startPingTicket()
);

bot.onText(
  events.stop,
  async (msg: Message): Promise<void> =>
    stopPingTicket()
);
