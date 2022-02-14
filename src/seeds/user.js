const mail = `${Date.now()}@mail.com`;
const nif = Date.now();
const Bi = Date.now();
const userName = `RMAS${Date.now()}`;

exports.seed = (knex) => {
  return knex('users').del()
    .then(() => knex('users').insert([
      {
        name: 'Ruben Sousa',
        username: userName,
        email: mail,
        birthday: '26-06-2000',
        NIF: nif,
        BI: Bi,
        gender: 'M',
        address: 'Rua da Luz',
        zip: '4760-000',
        location: 'Braga',
        password: '123456',
        admin: true,
      },
      {
        name: 'Tiburcio Matumbino',
        username: `eutiburcio${Date.now()}`,
        email: `${Date.now()}@gmail.com`,
        birthday: '26-06-2000',
        NIF: `${Date.now()}1`,
        BI: `${Date.now()}1`,
        gender: 'M',
        address: 'Rua da esquina',
        zip: '4760-000',
        location: 'Braga',
        password: '123456',
        admin: false,
      },
    ]));
};
