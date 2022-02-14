module.exports = (app) => {
  const findAll = (req, res, next) => {
    app.services.user.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const create = async (req, res, next) => {
    try {
      const result = await app.services.user.save(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  };

  const getID = (req, res, next) => {
    app.services.user.findOne({
      id: req.params.id,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  };

  const updateID = (req, res, next) => {
    app.services.user.update(req.params.id, req.body)
      .then((result) => {
        res.status(200).json(result[0]);
      })
      .catch((err) => next(err));
  };

  const deleteID = (req, res, next) => {
    app.services.user.remove(req.params.id)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => next(err));
  };

  return {
    findAll,
    create,
    getID,
    updateID,
    deleteID,
  };
};
