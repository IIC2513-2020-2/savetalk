const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const organization = await ctx.orm.organization.findByPk(id);
  if (!organization) ctx.throw(404);
  ctx.state.organization = organization;
  return next();
});

router.get('organizations', '/', async (ctx) => {
  const organizations = await ctx.orm.organization.findAll();
  await ctx.render('organizations/index', {
    organizations,
    organizationPath: (id) => ctx.router.url('organization', id),
  });
});

router.get('organization', '/:id', (ctx) => {
  const { organization } = ctx.state;
  return ctx.render('organizations/show', { organization });
});

module.exports = router;
