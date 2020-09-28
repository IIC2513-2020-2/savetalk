const KoaRouter = require('koa-router');

const events = require('./routes/events');
const hello = require('./routes/hello');
const index = require('./routes/index');
const organizations = require('./routes/organizations');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/events', events.routes());
router.use('/organizations', organizations.routes());

module.exports = router;
