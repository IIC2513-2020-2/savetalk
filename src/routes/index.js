const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  const events = await ctx.orm.event.findAll({ include: 'organization' });
  await ctx.render('index', {
    events,
    eventPath: (id) => ctx.router.url('event', id),
    organizationPath: (id) => ctx.router.url('organization', id),
  });
});

module.exports = router;
