import Router from 'koa-router';

const createRouter = new Router();

createRouter.get('/create', async (ctx, next) => {
  await ctx.render('create/index.html');
});

export default createRouter;
