const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'title',
  'description',
  'happensAt',
  'platform',
  'url',
  'photo',
  'registration',
  'organizationId',
];

router.get('events-new', '/new', async (ctx) => {
  const event = ctx.orm.event.build();
  const organizations = await ctx.orm.organization.findAll();
  return ctx.render('events/new', {
    event,
    organizations,
    createEventPath: ctx.router.url('events-create'),
  });
});

router.post('events-create', '/', async (ctx) => {
  const event = ctx.orm.event.build(ctx.request.body);
  try {
    await event.save({ fields: PERMITTED_FIELDS });
    ctx.redirect('/');
  } catch (error) {
    const organizations = await ctx.orm.organization.findAll();
    await ctx.render('events/new', {
      event,
      errors: error.errors,
      organizations,
      createEventPath: ctx.router.url('events-create'),
    });
  }
});

module.exports = router;
