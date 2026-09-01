const {
  OPERATIONS,
  evaluateExpression,
  normalizeOperator,
  parseNumber,
} = require('../calculator');

describe('calculator operations', () => {
  test('supports the basic arithmetic operations from the image examples', () => {
    expect(evaluateExpression('2', '+', '3')).toBe(5);
    expect(evaluateExpression('10', '-', '4')).toBe(6);
    expect(evaluateExpression('45', '*', '2')).toBe(90);
    expect(evaluateExpression('20', '/', '5')).toBe(4);
  });

  test('adds numbers correctly', () => {
    expect(OPERATIONS['+'](2, 3)).toBe(5);
    expect(OPERATIONS.add(7, 5)).toBe(12);
    expect(evaluateExpression('8', '+', '12')).toBe(20);
  });

  test('subtracts numbers correctly', () => {
    expect(OPERATIONS['-'](10, 4)).toBe(6);
    expect(OPERATIONS.subtract(15, 9)).toBe(6);
    expect(evaluateExpression('50', '-', '25')).toBe(25);
  });

  test('multiplies numbers correctly', () => {
    expect(OPERATIONS['*'](4, 5)).toBe(20);
    expect(OPERATIONS.multiply(9, 3)).toBe(27);
    expect(evaluateExpression('6', '*', '7')).toBe(42);
  });

  test('divides numbers correctly', () => {
    expect(OPERATIONS['/'](20, 5)).toBe(4);
    expect(OPERATIONS.divide(81, 9)).toBe(9);
    expect(evaluateExpression('100', '/', '4')).toBe(25);
  });

  test('normalizes supported operators', () => {
    expect(normalizeOperator('+')).toBe('+');
    expect(normalizeOperator('-')).toBe('-');
    expect(normalizeOperator('*')).toBe('*');
    expect(normalizeOperator('/')).toBe('/');
    expect(normalizeOperator('add')).toBe('add');
    expect(normalizeOperator('subtract')).toBe('subtract');
    expect(normalizeOperator('multiply')).toBe('multiply');
    expect(normalizeOperator('divide')).toBe('divide');
    expect(normalizeOperator('%')).toBeNull();
    expect(normalizeOperator('x')).toBeNull();
  });

  test('parses valid numeric input', () => {
    expect(parseNumber('7')).toBe(7);
    expect(parseNumber('3.5')).toBe(3.5);
    expect(parseNumber('-12')).toBe(-12);
    expect(parseNumber('0')).toBe(0);
  });

  test('throws for invalid numeric input', () => {
    expect(() => parseNumber('abc')).toThrow('Invalid number: abc');
    expect(() => parseNumber('')).toThrow('Invalid number: ');
    expect(() => parseNumber('Infinity')).toThrow('Invalid number: Infinity');
  });

  test('throws for unsupported operations', () => {
    expect(() => evaluateExpression('3', '%', '4')).toThrow(
      'Unsupported operation: %'
    );
    expect(() => evaluateExpression('3', 'x', '4')).toThrow(
      'Unsupported operation: x'
    );
  });

  test('throws when dividing by zero', () => {
    expect(() => evaluateExpression('10', '/', '0')).toThrow(
      'Division by zero is not allowed.'
    );
    expect(() => OPERATIONS['/'](5, 0)).toThrow(
      'Division by zero is not allowed.'
    );
  });
});
