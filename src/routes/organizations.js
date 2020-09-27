const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'name',
  'description',
  'url',
  'logo',
];

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
    newOrganizationPath: ctx.router.url('organizations-new'),
  });
});

router.get('organizations-new', '/new', (ctx) => {
  const organization = ctx.orm.organization.build();
  return ctx.render('organizations/new', {
    organization,
    createOrganizationPath: ctx.router.url('organizations-create'),
  });
})

router.post('organizations-create', '/', async (ctx) => {
  const organization = ctx.orm.organization.build(ctx.request.body);
  try {
    await organization.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('organizations'));
  } catch (error) {
    await ctx.render('organizations/new', {
      organization,
      errors: error.errors,
      createOrganizationPath: ctx.router.url('organizations-create'),
    });
  }
});

router.get('organization', '/:id', (ctx) => {
  const { organization } = ctx.state;
  return ctx.render('organizations/show', { organization });
});

module.exports = router;
