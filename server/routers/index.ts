import Router from 'koa-router';
import config from '../config';

const indexRouter = new Router();

indexRouter.get('/', async (ctx, next) => {
  await ctx.render('index.html', { name: 'fuck' });
});

indexRouter.get('/redirect/:id', async (ctx, next) => {
  await ctx.render('redirect.html', {
    id: ctx.params.id,
    api: config.api
  });
});

export default indexRouter;
