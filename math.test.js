import { add, minus, multi } from './math';

test('Test add 3 + 7', () => {
  expect(add(3, 7)).toBe(10);
});

test('Test minus 10 - 1', () => {
  expect(minus(10, 1)).toBe(9);
});

test('Test multi 3 * 3', () => {
  expect(multi(3, 3)).toBe(9);
});

test('Test object content equal', () => {
  const a = { obj: 1 };
  expect(a).toEqual({ obj: 1 });
});

const throwErrorFunc = () => {
  throw new Error('this is a error');
};

test('toThrow', () => {
  expect(throwErrorFunc).toThrow();
});
