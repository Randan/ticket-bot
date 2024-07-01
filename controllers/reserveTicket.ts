// WIP

const reserveTicket = async (id_chtime: number): Promise<void> => {
  try {
    await fetch(process.env.HSC_SITE + '/site/reservecherga', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,uk-UA;q=0.8,uk;q=0.7',
        'cache-control': 'no-cache',
        'content-type':
          'multipart/form-data; boundary=----WebKitFormBoundarys0rn1VUAPlaD5Ayc',
        pragma: 'no-cache',
        'sec-ch-ua':
          '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-csrf-token':
          'NAyR-MPZofzUAEXQ_Em5DZ7EPQLMxVtkw4cM2HdnRmlNZ9SLt5_2tb9QKraZIchG075aRKCtMye7tGqoIQ1yOQ==',
        'x-requested-with': 'XMLHttpRequest',
        cookie: process.env.COOKIE ?? '',
        Referer:
          process.env.HSC_SITE + '/site/step2?chdate=' + process.env.WANTED_TICKET_DATE + '&question_id=' +
          process.env.QUESTION_ID +
          '&id_es=',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body:
        '------WebKitFormBoundarys0rn1VUAPlaD5Ayc\r\nContent-Disposition: form-data; name="question_id"\r\n\r\n' +
        process.env.QUESTION_ID +
        '\r\n------WebKitFormBoundarys0rn1VUAPlaD5Ayc\r\nContent-Disposition: form-data; name="id_chtime"\r\n\r\n' +
        id_chtime +
        '\r\n------WebKitFormBoundarys0rn1VUAPlaD5Ayc\r\nContent-Disposition: form-data; name="email"\r\n\r\n' +
        process.env.EMAIL +
        '\r\n------WebKitFormBoundarys0rn1VUAPlaD5Ayc--\r\n',
      method: 'POST',
    });
  } catch (error) {
    console.error('Error in reserveTicket: ', error);
  }
};

export default reserveTicket;
