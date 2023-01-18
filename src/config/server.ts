import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  appName: process.env.APP_NAME,
  appPrefix: process.env.API_PREFIX,
  appEnv: process.env.APP_ENV,
  port: process.env.PORT || 4000,
}));
