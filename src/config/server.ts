import { registerAs } from '@nestjs/config';

import { API_PREFIX } from './contstants';

export default registerAs('server', () => ({
  appName: process.env.APP_NAME,
  appPrefix: API_PREFIX,
  appEnv: process.env.APP_ENV,
  port: process.env.PORT || 4000,
}));
