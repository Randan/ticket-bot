import bot from "../bot";
import ticketCron from "../cron/ticketCron";

const startPingTicket = () => {
  ticketCron.start();

  const message = 'Пінг талонів запущено';

  process.env.USER_ID && bot.sendMessage(process.env.USER_ID, message);
  process.env.ADMIN_ID && bot.sendMessage(process.env.ADMIN_ID, message);
};

export default startPingTicket;
