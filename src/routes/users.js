const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    app.services.user.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.post('/', async (req, res, next) => {
    try {
      const result = await app.services.user.save(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', (req, res, next) => {
    app.services.user.save({ ...req.body, user_id: req.user.id })
      .then((result) => {
        return res.status(201).json(result[0]);
      }).catch((err) => {
        next(err);
      });
  });

  router.get('/', (req, res, next) => {
    app.services.user.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.get('/:id', (req, res, next) => {
    app.services.user.findOne({ id: req.params.id })
      .then((result) => { res.status(200).json(result); })
      .catch((err) => next(err));
  });

  router.put('/:id', (req, res, next) => {
    app.services.user.update(req.params.id, req.body)
      .then((result) => { res.status(200).json(result[0]); })
      .catch((err) => next(err));
  });

  router.delete('/:id', (req, res, next) => {
    app.services.user.remove(req.params.id)
      .then(() => { res.status(204).send(); })
      .catch((err) => next(err));
  });

  return router;
};
