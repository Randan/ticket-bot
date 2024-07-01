// WIP

const registerTicket = async (): Promise<void> => {
  try {
    await fetch(process.env.HSC_SITE + '/site/finish', {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-US,en;q=0.9,uk-UA;q=0.8,uk;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        pragma: 'no-cache',
        'sec-ch-ua':
          '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        cookie: process.env.COOKIE ?? '',
        Referer: process.env.HSC_SITE + '/site/step3/726203964528823150809281',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: '_csrf=SfZXWF9Toy52IYbndWrAezzIdla_U1HbJA3F9MyCxjEwnRIrKxX0Zx1x6YEQArEwcbIRENM7OZhcPqOEmujyYQ%3D%3D&value=8KTSaE598FybtNzRGGT2NSGnDDZ8bDA8sSdHy4zyE9NDbhryDz5BAb4h7TSnZA2z',
      method: 'POST',
    });
  } catch (error) {
    console.error('Error in registerTicket: ', error);
  }
};

export default registerTicket;
