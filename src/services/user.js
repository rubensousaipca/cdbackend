const bcrypt = require('bcrypt-nodejs');
const validationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('users').where(filter).select(['id', 'email', 'name']);
  };

  const getPasswdHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (user) => {
    if (!user.name) throw new validationError ('Nome é um atributo obrigatório!');
    if (!user.email) throw new validationError ('O email é um atributo obrigatório!');
    if (!user.password) throw new validationError ('A palavra-passe é um atributo obrigatório!');
    if (!user.birthday) throw new validationError ('A data de nascimento é um atributo obrigatório!');
    if (!user.NIF) throw new validationError ('O NIF é um atributo obrigatório!');
    if (!user.BI) throw new validationError ('O BI é um atributo obrigatório!');
    if (!user.gender) throw new validationError ('O género é um atributo obrigatório!');
    if (!user.address) throw new validationError ('A morada é um atributo obrigatório!');
    if (!user.zip) throw new validationError ('O código postal é um atributo obrigatório!');
    if (!user.location) throw new validationError ('A localidade é um atributo obrigatório!');
    if (!user.admin) throw new validationError ('O admin é um atributo obrigatório!');

    const userDb = await findOne({ email: user.email });
    if (userDb) throw new validationError ('E-mail duplicado na base de dados!');

    const newUser = { ...user };
    newUser.password = getPasswdHash(user.password);
    return app.db('users').insert(newUser, [
      'id',
      'name',
      'username',
      'email',
      'birthday',
      'NIF',
      'BI',
      'gender',
      'address',
      'zip',
      'location',
      'admin',
    ]);
  };

  const findOne = (filter = {}) => {
    return app.db('users').where(filter).first();
  };

  const update = (id, user) => {
    return app.db('users')
      .where({ id })
      .update(user, [
        'id',
        'name',
        'email',
        'password',
        'username',
        'birthday',
        'NIF',
        'BI',
        'gender',
        'address',
        'zip',
        'location',
        'admin',
      ]);
  };

  const remove = (id) => {
    return app.db('users')
      .where({ id })
      .del();
  };

  return {
    findAll,
    save,
    findOne,
    update,
    remove,
  };
};
