describe('Example test', () => {
  it('equals true', () => {
    expect(true).toEqual(true);
  });
});

function addNumbers(num1, num2) {
  return num1 + num2;
}

describe('addNumbers', () => {
  it('adds two numbers', () => {
    expect(addNumbers(2, 2)).toEqual(4);
  });
});
