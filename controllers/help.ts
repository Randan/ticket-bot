import { Message } from 'node-telegram-bot-api';
import bot from '../bot';

const help = (msg: Message): void => {
  if (!msg.from) return;
  const { id } = msg.from;

  bot.sendMessage(
    id,
    'Вітаю!\n' +
    '\n' +
    'Я Бот що буде говорити Вам чи є електрохарчування по IP адресі\n' +
    '\n' +
    'Команди:\n' +
    '/help - допомога\n' +
    '/add 255.255.255.255 - додати IP адресу\n' +
    '/remove 255.255.255.255 - видалити IP адресу\n' +
    '/remove - видалити всі IP адреси, що відслідковуються\n' +
    '/list - список IP адрес, що відслідковуються\n' +
    '\n' +
    'Зауважте, що IP адреса, яку ви додаєте має пінгуватись зовні Вашої домашньої мережі!\n' +
    'Налаштуйте це у своєму роутері.\n' +
    '\n' +
    'Разом до Перемоги!\n'
  );
};

export default help;
