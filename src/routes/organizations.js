const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('organizations', '/', async (ctx) => {
  const organizations = await ctx.orm.organization.findAll();
  await ctx.render('organizations/index', { organizations });
});

module.exports = router;
