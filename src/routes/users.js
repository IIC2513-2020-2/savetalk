const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'password',
];

router.param('id', async (id, ctx, next) => {
  const user = await ctx.orm.user.findByPk(id);
  if (!user) ctx.throw(404);
  ctx.state.user = user;
  return next();
});

router.get('users', '/', async (ctx) => {
  const users = await ctx.orm.user.findAll();
  await ctx.render('users/index', {
    users,
    userPath: (id) => ctx.router.url('user', id),
    newUserPath: ctx.router.url('users-new'),
    editUserPath: (id) => ctx.router.url('users-edit', id),
  });
});

router.get('users-new', '/new', (ctx) => {
  const user = ctx.orm.user.build();
  return ctx.render('users/new', {
    user,
    submitPath: ctx.router.url('users-create'),
  });
});

router.post('users-create', '/', async (ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('users'));
  } catch (error) {
    await ctx.render('users/new', {
      user,
      errors: error.errors,
      submitPath: ctx.router.url('users-create'),
    });
  }
});

router.get('user', '/:id', async (ctx) => {
  const { user } = ctx.state;
  return ctx.render('users/show', {
    user,
  });
});

router.get('users-edit', '/:id/edit', (ctx) => {
  const { user } = ctx.state;
  return ctx.render('users/edit', {
    user,
    submitPath: ctx.router.url('users-update', user.id),
  });
});

router.patch('users-update', '/:id', async (ctx) => {
  const { user } = ctx.state;
  try {
    const params = ctx.request.body;
    if (!params.password) delete params.password;
    await user.update(params, { fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('users'));
  } catch (error) {
    await ctx.render('users/edit', {
      user,
      errors: error.errors,
      submitPath: ctx.router.url('users-update', user.id),
    });
  }
});

module.exports = router;
