const request = require('supertest');

const app = require('../src/app');

test('Test #1 - Listar os utilizadores', () => {
    return request(app).get('/users')
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0]).toHaveProperty('name', 'Ruben Sousa');
        });
});

test('Test #2 - Inserir utilizadores', () => {
    return request(app).post('/users')
        .send({ name: 'Ruben Sousa', email: 'rubensousayt@gmail.com', id: '24657'})
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Ruben Sousa');
        })
})