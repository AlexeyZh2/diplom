const express = require('express');

const cors = require('cors');

const { celebrate, Joi, errors } = require('celebrate');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const routesUsers = require('./routes/users');

const routesCards = require('./routes/cards');

const { postUser, login } = require('./controllers/users');

const { requestLogger, errorLogger } = require('./midlewares/Logger');

const { auth } = require('./midlewares/auth');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

// const { PORT = 4000 } = process.env;

const app = express();

app.use(cors());

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
app.use(allowCrossDomain);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.get('api/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/api/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    }),
  }),
  postUser,
);
app.post(
  '/api/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
app.use(auth);
app.use('/api/users', routesUsers);
app.use('/api/cards', routesCards);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемая страница не существует!');
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : `Произошла ошибка: ${message}`,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
