const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const mail = `${Date.now()}@mail.pt`;
const userrefresh = `RS${Date.now()}`;
const nif = Date.now();
const bi = Date.now();
const secret = 'ipca!DWM@202122';

let users;
let userToDelete;
let userUpdate;

beforeAll(async () => {
  const res = await app.services.user.save({
    name: 'Ruben Sousa',
    username: `ruben1${Date.now()}`,
    email: `ruben11${Date.now()}`,
    birthday: '26/06/2000',
    NIF: `ruben111${Date.now()}`,
    BI: `ruben1111${Date.now()}`,
    gender: 'masculine',
    address: 'Rua Alto das Laranjeiras 26',
    zip: '4760-702',
    location: 'Braga',
    password: '12345',
    admin: true,
  });

  users = { ...res[0] };
  users.token = jwt.encode(users, secret);

  const res2 = await app.services.user.save({
    name: 'Ruben Sousa',
    username: `ruben2${Date.now()}`,
    email: `ruben22${Date.now()}`,
    birthday: '26/06/2000',
    NIF: `ruben222${Date.now()}`,
    BI: `ruben2222${Date.now()}`,
    gender: 'masculine',
    address: 'Rua Alto das Laranjeiras 26',
    zip: '4760-702',
    location: 'Braga',
    password: '12345',
    admin: true,
  });
  userToDelete = { ...res2[0] };
  userToDelete.token = jwt.encode(userToDelete, secret);

  const res3 = await app.services.user.save({
    name: 'Ruben Sousa',
    username: `ruben3${Date.now()}`,
    email: `ruben33${Date.now()}`,
    birthday: '26/06/2000',
    NIF: `ruben333${Date.now()}`,
    BI: `ruben3333${Date.now()}`,
    gender: 'masculine',
    address: 'Rua Alto das Laranjeiras 26',
    zip: '4760-702',
    location: 'Braga',
    password: '12345',
    admin: true,
  });
  userUpdate = { ...res3[0] };
  userUpdate.token = jwt.encode(userUpdate, secret);

});

test('Test #1 - Listar os utilizadores', () => {
  return request(app).get('/users')
    .set('authorization', `bearer ${users.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #2 - Inserir utilizadores', () => {
  return request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      email: mail,
      birthday: '26/06/2000',
      NIF: nif,
      BI: bi,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      location: 'Braga',
      password: '12345',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Ruben Sousa');
      expect(res.body).not.toHaveProperty('password');
    });
});

test('Test #2.1 - Guardar a palavra passe encriptada', async () => {
  const res = await request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({ 
      name: 'Ruben Sousa',
      username: `ruben1${Date.now()}`,
      email: `ruben11${Date.now()}`,
      birthday: '26/06/2000',
      NIF: `ruben111${Date.now()}`,
      BI: `ruben1111${Date.now()}`,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      location: 'Braga',
      password: '12345',
      admin: true,
    });
  expect(res.status).toBe(201);

  const { id } = res.body;
  const userDB = await app.services.user.findOne({ id });
  expect(userDB.password).not.toBeUndefined();
  expect(userDB.password).not.toBe('12345');
});

test('Test #3 - Inserir utilizadores sem nome', () => {
  return request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      username: userrefresh,
      email: mail,
      birthday: '26/06/2000',
      NIF: nif,
      BI: bi,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      location: 'Braga',
      password: '12345',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório!');
    });
});

test('Test #4 - Inserir utilizador sem email', async () => {
  const result = await request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      birthday: '26/06/2000',
      NIF: nif,
      BI: bi,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      location: 'Braga',
      password: '12345',
      admin: true,
    });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('O email é um atributo obrigatório!');
});

test('Test #5 - Inserir utilizador sem password', (done) => {
  request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      email: mail,
      birthday: '26/06/2000',
      NIF: nif,
      BI: bi,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      location: 'Braga',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('A palavra-passe é um atributo obrigatório!');
      done();
    });
});

test('Test #6 - Inserir utilizadores sem data de nascimento', () => {
  return request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      email: mail,
      NIF: nif,
      BI: bi,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      location: 'Braga',
      password: '12345',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('A data de nascimento é um atributo obrigatório!');
    });
});

test('Test #7 - Inserir utilizadores sem NIF', () => {
  return request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      email: mail,
      birthday: '26/06/2000',
      BI: bi,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      location: 'Braga',
      password: '12345',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('O NIF é um atributo obrigatório!');
    });
});

test('Test #8 - Inserir utilizadores sem BI', () => {
  return request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      email: mail,
      birthday: '26/06/2000',
      NIF: nif,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      location: 'Braga',
      password: '12345',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('O BI é um atributo obrigatório!');
    });
});

test('Test #9 - Inserir utilizadores sem género', () => {
  return request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      email: mail,
      birthday: '26/06/2000',
      BI: bi,
      NIF: nif,
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      location: 'Braga',
      password: '12345',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('O género é um atributo obrigatório!');
    });
});

test('Test #10 - Inserir utilizadores sem morada', () => {
  return request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      email: mail,
      birthday: '26/06/2000',
      BI: bi,
      NIF: nif,
      gender: 'masculine',
      zip: '4760-702',
      location: 'Braga',
      password: '12345',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('A morada é um atributo obrigatório!');
    });
});

test('Test #11 - Inserir utilizadores sem código postal', () => {
  return request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      email: mail,
      birthday: '26/06/2000',
      BI: bi,
      NIF: nif,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      location: 'Braga',
      password: '12345',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('O código postal é um atributo obrigatório!');
    });
});

test('Test #12 - Inserir utilizadores sem localidade', () => {
  return request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      email: mail,
      birthday: '26/06/2000',
      BI: bi,
      NIF: nif,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      password: '12345',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('A localidade é um atributo obrigatório!');
    });
});

test('Test #13 - Inserir utilizadores sem opção admin', () => {
  return request(app).post('/users')
    .set('authorization', `bearer ${users.token}`)
    .send({
      name: 'Ruben Sousa',
      username: userrefresh,
      email: mail,
      birthday: '26/06/2000',
      BI: bi,
      NIF: nif,
      gender: 'masculine',
      address: 'Rua Alto das Laranjeiras 26',
      zip: '4760-702',
      location: 'Braga',
      password: '12345',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('O admin é um atributo obrigatório!');
    });
});

test('Test #16 - Listar user por id ', () => {
  return request(app).get(`/users/${users.id}`)
    .set('authorization', `bearer ${users.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(users.name);
      expect(res.body.password).not.toBe('123456');
    });
});

test('Test #18 -Atualizar por ID', async () => {
  return request(app).put(`/users/${users.id}`)
    .set('authorization', `bearer ${users.token}`)
    .send({ name: 'Darwin Nunez' })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Darwin Nunez');
    });
});

test('Test #19 - Eliminar por ID', async () => {
  return request(app).delete(`/users/${users.id}`)
    .set('authorization', `bearer ${users.token}`)
    .send({ name: 'Darwin Nunez' })
    .then((res) => {
      expect(res.status).toBe(204);
    });
});
