#!/usr/bin/env node

// Supported operations for this calculator:
// - addition (+)
// - subtraction (-)
// - multiplication (*)
// - division (/)

const OPERATIONS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    return a / b;
  },
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    return a / b;
  },
};

function normalizeOperator(value) {
  if (!value) {
    return null;
  }

  const normalized = String(value).trim();
  return normalized in OPERATIONS ? normalized : null;
}

function parseNumber(value) {
  const originalValue = String(value);

  if (originalValue.trim() === '') {
    throw new Error(`Invalid number: ${originalValue}`);
  }

  const parsed = Number(originalValue);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid number: ${originalValue}`);
  }
  return parsed;
}

function evaluateExpression(left, operator, right) {
  const normalizedOperator = normalizeOperator(operator);

  if (!normalizedOperator) {
    throw new Error(
      `Unsupported operation: ${operator}. Use one of: +, -, *, /`
    );
  }

  const firstNumber = parseNumber(left);
  const secondNumber = parseNumber(right);

  return OPERATIONS[normalizedOperator](firstNumber, secondNumber);
}

function printUsage() {
  console.log('Usage: node src/calculator.js <number> <operator> <number>');
  console.log('Examples:');
  console.log('  node src/calculator.js 10 + 5');
  console.log('  node src/calculator.js 20 - 8');
  console.log('  node src/calculator.js 6 * 7');
  console.log('  node src/calculator.js 42 / 6');
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printUsage();
    process.exit(1);
  }

  try {
    if (args.length === 3) {
      const [left, operator, right] = args;
      const result = evaluateExpression(left, operator, right);
      console.log(`Result: ${result}`);
      return;
    }

    if (args.length === 1 && args[0] === 'help') {
      printUsage();
      return;
    }

    throw new Error(
      'Calculator expects exactly three arguments: <number> <operator> <number>'
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    printUsage();
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  evaluateExpression,
  normalizeOperator,
  parseNumber,
  OPERATIONS,
};
