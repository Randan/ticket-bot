import bot from '../bot';
import { IFreeTicket } from '../interfaces';
// import reserveTicket from './reserveTicket';
import stopPingTicket from './stopPingTicket';

const pingTicket = async (): Promise<void> => {
  try {
    const response = await fetch(process.env.HSC_SITE + '/site/freetimes', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,uk-UA;q=0.8,uk;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        pragma: 'no-cache',
        'sec-ch-ua':
          '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-csrf-token': process.env.SCRF_TOKEN ?? '',
        'x-requested-with': 'XMLHttpRequest',
        cookie: process.env.COOKIE ?? '',
        Referer:
          process.env.HSC_SITE + '/site/step2?chdate=' + process.env.WANTED_TICKET_DATE + '&question_id=' +
          process.env.QUESTION_ID +
          '&id_es=',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body:
        'office_id=' + process.env.OFFICE_ID + '&date_of_admission=' + process.env.WANTED_TICKET_DATE + '&question_id=' +
        process.env.QUESTION_ID +
        '&es_date=&es_time=',
      method: 'POST',
    });

    const data: IFreeTicket = await response.json();

    console.log(data);

    if (data.rows.length) {
      stopPingTicket();

      const message = 'Є талон на ' + process.env.WANTED_TICKET_DATE + ' ' + data.rows[0].chtime;

      process.env.USER_ID && bot.sendMessage(process.env.USER_ID, message);
      process.env.ADMIN_ID && bot.sendMessage(process.env.ADMIN_ID, message);

      // data.rows[0].id && reserveTicket(data.rows[0].id);
    }
  } catch (error) {
    console.error('Ping ticket failure', error);
  }
};

export default pingTicket;
