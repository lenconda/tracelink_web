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
  api,
  site,
  productName: 'TraceLink',
};

export default config;
