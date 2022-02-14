const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const validationError = require('../errors/validationError');
const secret = 'ipca!DWM@2122';

module.exports = (app) => {
  const signin = (req, res, next) => {
    app.services.user.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) throw new validationError('Autenticação Inválida! #2');
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          const token = jwt.encode(payload, secret);
          res.status(200).json({ token });
        } else throw new validationError('Autenticação Inválida!');
      }).catch((err) => next(err));
  };

  return { signin };
};
