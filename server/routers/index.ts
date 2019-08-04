import Router from 'koa-router';

const indexRouter = new Router();

indexRouter.get('/', async (ctx, next) => {
  await ctx.render('index.html', { name: 'fuck' });
});

export default indexRouter;
