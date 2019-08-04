module.exports = {
  name: 'TraceLink',
  isDev: process.env.NODE_ENV.toLowerCase() === 'development',
  isProduction: process.env.NODE_ENV.toLowerCase() === 'production',
  isTest: process.env.NODE_ENV.toLowerCase() === 'test'
};
