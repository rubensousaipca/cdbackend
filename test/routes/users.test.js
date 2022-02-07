const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@mail.pt`;
const userrefresh = `RS${Date.now()}`;
const nif = Date.now();
const bi = Date.now();

test('Test #1 - Listar os utilizadores', () => {
    return request(app).get('/users')
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
});

test('Test #2 - Inserir utilizadores', () => {
    return request(app).post('/users')
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
        });
});

test('Test #3 - Inserir utilizadores sem nome', () => {
    return request(app).post('/users')
        .send({ email: mail, password: '12345 '})
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Nome é um atributo obrigatório!');
        });
});

test('Test #4 - Inserir utilizador sem email', async () => {
    const result = await request(app).post('/users')
        .send({ name: 'Ruben Sousa', password: '12345'});
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('O email é um atributo obrigatório!');
});

test('Test #5 - Inserir utilizador sem password', (done) => {
    request(app).post('/users')
        .send({ name: 'Ruben Sousa' , email: mail})
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('A palavra-passe é um atributo obrigatório!');
            done();
        });
});

test('Test #6 - Inserir utilizadores sem data de nascimento', () => {
    return request(app).post('/users')
        .send({ 
            name: 'Jose Ferreira',
            username: userrefresh,
            email: mail,
            NIF: nif,
            BI: bi,
            gender: 'masculine',
            address: 'Rua D.Pedro V',
            zip: '4715-422',
            location: 'Braga',
            password: '12345',
            admin: true,
        })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('A data de nascimento é um atributo obrigatório!');
        });
});

/*
test('Test #6 - Inserir utilizadores', () => {
    return request(app).post('/users')
        .send({ name: 'Ruben Sousa', email: mail, password: '12345'})
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('E-mail duplicado na base de dados!');
        });
});
*/

/*
test('Test #7 - Listar conta por ID', () => {
    return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(users.name);
      expect(res.body).not.toBe(users.password);
    });
});
*/

