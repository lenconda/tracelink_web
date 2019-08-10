import path from 'path';
import kcors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import config from './config';
import views from 'koa-views';
import serve from 'koa-static';
import proxy from 'http-proxy-middleware';
import connect from 'koa2-connect';
import { execSync } from 'child_process';

import indexRouter from './routers/index';
import createRouter from './routers/create';
import recordsRouter from './routers/records';

const app = new Koa();

app.use(views(path.join(__dirname, config.isDev ? '../dev/server-templates' : '../server-templates'), {
  map: {
    html: 'handlebars'
  }
}));

app.use(async (ctx, next) => {
  if (ctx.url.startsWith('/api')) {
    ctx.respond = false;
    await connect(proxy({
      target: config.api,
      changeOrigin: true,
      secure: config.isDev ? false : true,
    }))(ctx, next);
  }
  await next();
});

app.use(indexRouter.routes()).use(indexRouter.allowedMethods());
app.use(createRouter.routes()).use(createRouter.allowedMethods());
app.use(recordsRouter.routes()).use(recordsRouter.allowedMethods());

(config.isDev && app.use(serve(path.join(__dirname, '../dev/server-bundle'))));
app.use(serve(path.join(__dirname, (config.isDev ? '../dev/' : '../dist/') + 'server-static')));

app.use(kcors());

app.use(bodyParser());

if (config.isDev) app.use(logger());

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

process.on('SIGINT', () => {
  if (config.isDev) {
    execSync('npm run clean:dev');
  }
});

app.listen(port);
