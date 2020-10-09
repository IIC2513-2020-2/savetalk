const KoaRouter = require('koa-router');

const events = require('./routes/events');
const hello = require('./routes/hello');
const index = require('./routes/index');
const organizations = require('./routes/organizations');
const session = require('./routes/session');
const users = require('./routes/users');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    newSessionPath: ctx.router.url('session-new'),
    destroySessionPath: ctx.router.url('session-destroy'),
  });
  return next();
});

router.use(async (ctx, next) => {
  if (ctx.session.currentUserId) {
    ctx.state.currentUser = await ctx.orm.user.findByPk(ctx.session.currentUserId);
  }
  return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/events', events.routes());
router.use('/organizations', organizations.routes());
router.use('/session', session.routes());
router.use('/users', users.routes());

module.exports = router;
