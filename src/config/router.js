const express = require('express');

module.exports = (app) => {
  app.use('/auth', app.routes.auths);

  const secureRouter = express.Router();

  secureRouter.use('/users', app.routes.users);

  app.use('/v1', app.config.passport.authenticate(), secureRouter);
};
