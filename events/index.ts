import { Message } from 'node-telegram-bot-api';
import bot from '../bot';
import { help, addUser, removeUser } from '../controllers';

const events: Record<string, RegExp> = {
  help: /\/help/,
  add: /\/add/,
  remove: /\/remove/,
};

bot.onText(events.help, (msg: Message): void => help(msg));

bot.onText(
  events.add,
  async (msg: Message): Promise<void> =>
    addUser(msg.from?.id || 0, msg.text?.split(' ')[1] || '')
);

bot.onText(
  events.remove,
  async (msg: Message): Promise<void> =>
    removeUser(msg.from?.id || 0, msg.text?.split(' ')[1])
);
