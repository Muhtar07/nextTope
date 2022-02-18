const express = require('express');
const logger = require('morgan');
const hbs = require('hbs');
const path = require('path');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();

const app = express();
const PORT = 3000;

const checkUser = require('./middleware/check-user');
const indexRouter = require('./routes/index-router');
const userRouter = require('./routes/user-router');
const taskRouter = require('./routes/task-router');

hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('check', (id, userid) => id === userid);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    name: 'sId',
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: 'mlkfdamfdskjnfsgnjk',
    resave: false,
  }),
);

app.use(checkUser);
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/task', taskRouter);

app.listen(PORT, () => {
  console.log('Server started PORT', PORT);
});
