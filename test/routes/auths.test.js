const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@ipca.pt`;
const userrefresh = `RS${Date.now()}`;
const nif = Date.now();
const bi = Date.now();

test('Test #19 - Receber token ao autenticar', () => {
  return app.services.user.save(
    {
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
    },
  ).then(() => request(app).post('/auth/signin')
    .send({ email: mail, password: '12345' }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
});

test('Test #20 - Tentativa de autenticacao errada', () => {
  const nmail = `${Date.now()}@mail.com`;
  return app.services.user.save(
    {
      name: 'Ruben Sousa',
      username: `ruben10${Date.now()}`,
      email: nmail,
      birthday: '26-06-2000',
      NIF: `${Date.now()}1`,
      BI: `${Date.now()}1`,
      gender: 'M',
      address: 'Rua da esquina',
      zip: '4760-000',
      location: 'Braga',
      password: '123456',
      admin: true,
    },
  ).then(() => request(app).post('/auth/signin')
    .send({ email: mail, password: '67890' }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Autenticação Inválida!');
    });
});

test('Test #21 - Tentativa de autenticação com utilizador errado', () => {
  const nmail = `${Date.now()}@ipca`;
  return request(app).post('/auth/signin')
    .send({ email: nmail, password: '67890' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Autenticação Inválida! #2');
    });
});

test('Test #22 - Aceder a rotas protegidas', () => {
  return request(app).get('/v1/users')
    .then((res) => {
      expect(res.status).toBe(401);
    });
});

test('Test #23 - Criar utilizador', () => {
  const nmail = `${Date.now()}@ipca.pt`;
  return request(app).post('/auth/signup')
    .send({
      name: 'Ruben Sousa',
      username: `ruben10${Date.now()}`,
      email: nmail,
      birthday: '26-06-2000',
      NIF: `${Date.now()}1`,
      BI: `${Date.now()}1`,
      gender: 'M',
      address: 'Rua da esquina',
      zip: '4760-000',
      location: 'Braga',
      password: '123456',
      admin: true,
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Ruben Sousa');
      expect(res.body).toHaveProperty('email');
      expect(res.body).not.toHaveProperty('password');
    });
});
