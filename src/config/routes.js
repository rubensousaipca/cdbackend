module.exports = (app) => {
  app.route('/auth/signin').post(app.routes.auths.signin);
  app.route('/auth/signup').post(app.routes.users.create);

  app.route('/users')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.getID)
    .put(app.routes.users.updateID)
    .delete(app.routes.users.deleteID);
};
