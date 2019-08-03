import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const env = process.env.NODE_ENV || 'development';
const isProduction = env.toLowerCase() === 'production';
const isDev = env.toLowerCase() === 'development';
const isTest = env.toLowerCase() === 'test';
const site = isProduction
  ? 'https://tracel.ink'
  : 'http://localhost:8080';
const api = isProduction
  ? 'https://api.tracel.ink'
  : 'http://localhost:4318';

const config = {
  env: env,
  isProduction,
  isDev,
  isTest,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT && parseInt(process.env.DB_PORT, 10),
  dbUser: process.env.DB_USER,
  dbToken: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT && parseInt(process.env.SMTP_PORT, 10),
  smtpUser: process.env.SMTP_USER,
  smtpToken: process.env.SMTP_PASSWORD,
  recordPrefix: `${site}/assets/redirect.html`,
  linkPrefix: `${site}/link?trackId=`,
  apiPrefix: api,
  siteUrl: site,
  productName: 'TraceLink',
};

export default config;
