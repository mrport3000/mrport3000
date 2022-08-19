const sum = require('./sum.js');

describe('Testing Jest', () => {

  it('Should successfully add 1 + 2', () => {
    expect(sum(1, 2)).toBe(3);
  });

});