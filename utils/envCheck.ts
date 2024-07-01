const envCheck = (callBack?: () => void): void => {
  if (!process.env.COOKIE) {
    throw new Error('COOKIE is not defined');
  }
  if (!process.env.EMAIL) {
    throw new Error('EMAIL is not defined');
  }
  if (!process.env.WANTED_TICKET_DATE) {
    throw new Error('WANTED_TICKET_DATE is not defined');
  }
  if (!process.env.QUESTION_ID) {
    throw new Error('QUESTION_ID is not defined');
  }
  if (!process.env.OFFICE_ID) {
    throw new Error('OFFICE_ID is not defined');
  }
  if (!process.env.PORT) {
    throw new Error('PORT is not defined');
  }
  if (!process.env.TIMEZONE) {
    throw new Error('TIMEZONE is not defined');
  }
  if (!process.env.BOT_API) {
    throw new Error('BOT_API is not defined');
  }
  if (!process.env.CRON_EXPRESSION) {
    throw new Error('CRON_EXPRESSION is not defined');
  }
  if (!process.env.USER_ID) {
    throw new Error('USER_ID is not defined');
  }
  if (!process.env.ADMIN_ID) {
    throw new Error('ADMIN_ID is not defined');
  }
  if (!process.env.HSC_SITE) {
    throw new Error('HSC_SITE is not defined');
  }
  if (!process.env.SCRF_TOKEN) {
    throw new Error('SCRF_TOKEN is not defined');
  }

  callBack && callBack();
};

export default envCheck;
