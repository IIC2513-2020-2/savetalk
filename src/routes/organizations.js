const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'name',
  'description',
  'url',
  'logo',
];

const PROTECTED_PATHS = [
  '/new',
  '/:id/edit',
];

function checkAuth(ctx, next) {
  const { currentUser } = ctx.state;
  if (!currentUser) ctx.throw(401);

  return next();
}

router.use(PROTECTED_PATHS, checkAuth);

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
    editOrganizationPath: (id) => ctx.router.url('organizations-edit', id),
  });
});

router.get('organizations-new', '/new', (ctx) => {
  const organization = ctx.orm.organization.build();
  return ctx.render('organizations/new', {
    organization,
    submitPath: ctx.router.url('organizations-create'),
  });
});

router.post('organizations-create', '/', checkAuth, async (ctx) => {
  const organization = ctx.orm.organization.build(ctx.request.body);
  try {
    await organization.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('organizations'));
  } catch (error) {
    await ctx.render('organizations/new', {
      organization,
      errors: error.errors,
      submitPath: ctx.router.url('organizations-create'),
    });
  }
});

router.get('organization', '/:id', async (ctx) => {
  const { organization } = ctx.state;
  return ctx.render('organizations/show', {
    organization,
    events: await organization.getEvents(),
  });
});

router.get('organizations-edit', '/:id/edit', (ctx) => {
  const { organization } = ctx.state;
  return ctx.render('organizations/edit', {
    organization,
    submitPath: ctx.router.url('organizations-update', organization.id),
  });
});

router.patch('organizations-update', '/:id', checkAuth, async (ctx) => {
  const { cloudinary, organization } = ctx.state;
  try {
    const { logo } = ctx.request.files;
    if (logo.size > 0) {
      // This does now allow to update existing images. It should be handled
      const uploadedImage = await cloudinary.uploader.upload(logo.path);
      ctx.request.body.logo = uploadedImage.public_id;
    }
    await organization.update(ctx.request.body, { fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('organizations'));
  } catch (error) {
    await ctx.render('organizations/edit', {
      organization,
      errors: error.errors,
      submitPath: ctx.router.url('organizations-update', organization.id),
    });
  }
});

module.exports = router;
