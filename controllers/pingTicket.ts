import bot from '../bot';
import { IFreeTicket } from '../interfaces';
// import reserveTicket from './reserveTicket';
import stopPingTicket from './stopPingTicket';

const pingTicket = async (): Promise<void> => {
  try {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Sec-Fetch-Site", "same-origin");
    myHeaders.append("Accept-Language", "uk-UA,uk;q=0.9");
    myHeaders.append("Accept-Encoding", "gzip, deflate, br");
    myHeaders.append("Sec-Fetch-Mode", "cors");
    myHeaders.append("Host", process.env.HSC_DOMAIN ?? '');
    myHeaders.append("Origin",  process.env.HSC_SITE ?? '');
    myHeaders.append("Content-Length", "75");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15");
    myHeaders.append("Referer", process.env.HSC_SITE + "/site/step2?chdate=" + process.env.WANTED_TICKET_DATE + "&question_id=" + process.env.QUESTION_ID + "&id_es=");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Sec-Fetch-Dest", "empty");
    myHeaders.append("Cookie", process.env.COOKIE ?? '');
    myHeaders.append("X-Requested-With", "XMLHttpRequest");
    myHeaders.append("X-CSRF-Token", process.env.SCRF_TOKEN ?? '');

    const raw = "office_id=" + process.env.OFFICE_ID + "&date_of_admission=" + process.env.WANTED_TICKET_DATE + "&question_id=" + process.env.QUESTION_ID + "&es_date=&es_time=";

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      // redirect: "follow"
    };

    const response = await fetch("https://eq.hsc.gov.ua/site/freetimes", requestOptions);

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
