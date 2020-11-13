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

router.param('id', async (id, ctx, next) => {
  const event = await ctx.orm.event.findByPk(id, { include: ['organization', 'attendees'] });
  if (!event) ctx.throw(404);
  ctx.state.event = event;
  return next();
});

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

router.get('event', '/:id', async (ctx) => {
  const { currentUser, event } = ctx.state;
  const attendeeIds = event.attendees.map(({ id }) => id);
  const isCurrentUserAttending = !!currentUser && attendeeIds.includes(currentUser.id);
  return ctx.render('events/show', {
    event,
    isCurrentUserAttending,
    organizationPath: (id) => ctx.router.url('organization', id),
    attendancePath: ctx.router.url('event-create-attendance', event.id),
  });
});

router.get('event-attendances', '/:id/attendances', async (ctx) => {
  const { event } = ctx.state;
  ctx.body = event.attendees.map(({ id, email }) => ({ id, email }));
});

router.post('event-create-attendance', '/:id/attendances', async (ctx) => {
  const { currentUser, event } = ctx.state;
  const { userId } = ctx.request.body;
  const user = userId ? (await ctx.orm.user.findByPk(userId)) : currentUser;
  if (!user) ctx.throw(422);
  await event.addAttendee(user);
  switch (ctx.accepts(['html', 'json'])) {
    case 'html':
      ctx.redirect(ctx.router.url('event', event.id));
      break;
    case 'json':
      ctx.status = 201;
      ctx.body = { message: 'Attendee added' };
      break;
    default:
      ctx.throw(406);
      break;
  }
});

module.exports = router;
