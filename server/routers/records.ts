import Router from 'koa-router';
import { AxiosResponse } from 'axios';
import http from '../utils/http';

const recordsRouter = new Router({
  prefix: '/records'
});

interface Response<T> {
  status: number;
  data: T;
  message: string;
}

interface LinkInfo {
  originalUrl: string;
  shorternUrl: string;
  comment: string;
  qrCode: string;
  createTime: number;
}

recordsRouter.get('/detail/:id', async (ctx, next) => {
  await ctx.render('records/detail/index.html');
});

recordsRouter.get('/:id', async (ctx, next) => {
  const result: AxiosResponse<Response<LinkInfo>> = await http.get(`/api/links/${ctx.params.id}`);
  const link = result.data.data;
  await ctx.render('records/index.html', {
    originalUrl: link.originalUrl,
    shorternUrl: link.shorternUrl,
    comment: link.comment,
    qrCode: link.qrCode,
    createTime: new Date(link.createTime).toUTCString(),
    trackId: ctx.params.id
  });
});

export default recordsRouter;
