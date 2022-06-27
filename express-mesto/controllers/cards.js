const Card = require('../models/card');

const CastError = require('../errors/CastError');

const ForbiddenError = require('../errors/ForbiddenError');

const NotFoundError = require('../errors/NotFoundError');

const ValidationError = require('../errors/ValidationError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Нет карточки с таким id!');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Нельзя удалять чужие карточки!');
      } else {
        Card.findByIdAndRemove(req.params._id)
          .then((data) => res
            .status(200)
            .send({ data, message: 'Карточка успешно удалена!' }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Невалидный id карточки'));
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Нет карточки с таким id!');
    })
    .then((like) => res.status(200).send(like))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Невалидный id карточки!'));
      }
      next(err);
    });
};

const removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Нет карточки с таким id!');
    })
    .then((dislike) => res.status(200).send(dislike))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Невалидный id карточки!'));
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  removeLikeCard,
};
