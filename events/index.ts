import { Message } from 'node-telegram-bot-api';
import bot from '../bot';
import { help, addUser, removeUser } from '../controllers';

const events: Record<string, RegExp> = {
  help: /\/help/,
  start: /\/start/,
  stop: /\/stop/,
};

bot.onText(events.help, (msg: Message): void => help(msg));

bot.onText(
  events.start,
  async (msg: Message): Promise<void> =>
    addUser(msg.from?.id || 0, msg.text?.split(' ')[1] || '')
);

bot.onText(
  events.stop,
  async (msg: Message): Promise<void> =>
    removeUser(msg.from?.id || 0, msg.text?.split(' ')[1])
);
