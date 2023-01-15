export default () => ({
  appSecret: process.env.APP_SECRET,
  dbHost: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  clientID: process.env.AUTH_GOOGLE_CLIENT_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
});
