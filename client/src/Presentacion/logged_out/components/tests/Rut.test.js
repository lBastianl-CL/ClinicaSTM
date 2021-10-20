const { validarRUT } = require('validar-rut')

// validarRUT

test('rut 123456785 devuelve true', () => {
  expect(validarRUT(123456785)).toBe(true);
});

test('rut 2046757691 devuelve true', () => {
  expect(validarRUT(204675791)).toBe(true);
});

test('rut 2046757695 devuelve false', () => {
  expect(validarRUT(2046757695)).toBe(false);
});

test('rut 2046757693 devuelve false', () => {
  expect(validarRUT(2046757693)).toBe(false);
});