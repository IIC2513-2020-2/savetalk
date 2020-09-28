const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  const events = await ctx.orm.event.findAll({ include: 'organization' });
  await ctx.render('index', {
    events,
    organizationPath: (id) => ctx.router.url('organization', id),
  });
});

module.exports = router;
