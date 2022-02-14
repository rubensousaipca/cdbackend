test('Validar as principais operações do JEST', () => {
  let number = null;
  expect(number).toBeNull();
  number = 10;
  expect(number).not.toBeNull();
  expect(number).toBe(10);
  expect(number).toEqual(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test('Validar operações com objetos', () => {
  const obj = {
    name: 'Ruben Sousa',
    mail: 'rubensousayt@gmail.com'
  };
  expect(obj).toHaveProperty('name');
  expect(obj).toHaveProperty('name', 'Ruben Sousa');
  expect(obj.name).toBe('Ruben Sousa');

  const obj2 = {
    name: 'Ruben Sousa',
    mail: 'rubensousayt@gmail.com'
  };
  expect(obj).toEqual(obj2);
  expect(obj).toBe(obj);
});