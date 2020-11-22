const KoaRouter = require('koa-router');
const events = require('./events');

const router = new KoaRouter({ prefix: '/api' });

router.use((ctx, next) => {
  ctx.apiUrl = (...params) => `${ctx.origin}${ctx.router.url(...params)}`;
  return next();
});

router.get('/', async (ctx) => {
  ctx.body = { message: 'savetalk API' };
});

router.use('/events', events.routes());

module.exports = router;
