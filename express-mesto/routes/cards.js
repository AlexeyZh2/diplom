const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { sampleUrl } = require('../config');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  removeLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().pattern(sampleUrl).required(),
    }),
  }),
  createCard,
);
router.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteCard,
);

router.put(
  '/likes/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required().length(24).hex(),
    }),
  }),
  likeCard,
);

router.delete(
  '/likes/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required().length(24).hex(),
    }),
  }),
  removeLikeCard,
);

module.exports = router;
