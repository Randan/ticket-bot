import { Message } from 'node-telegram-bot-api';
import bot from '../bot';

const help = (msg: Message): void => {
  if (!msg.from) return;
  const { id } = msg.from;

  bot.sendMessage(
    id,
    ''
  );
};

export default help;
