import bot from "../bot";
import ticketCron from "../cron/ticketCron";

const stopPingTicket = () => {
  ticketCron.stop();

  const message = 'Пінг талонів зупинено';

  process.env.USER_ID && bot.sendMessage(process.env.USER_ID, message);
  process.env.ADMIN_ID && bot.sendMessage(process.env.ADMIN_ID, message);
};

export default stopPingTicket;
