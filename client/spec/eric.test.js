// eslint-disable-next-line import/extensions
const sum = require('./sum.js');

// eslint-disable-next-line no-undef
describe('Testing Jest', () => {
  // eslint-disable-next-line no-undef
  it('Should successfully add 1 + 2', () => {
    // eslint-disable-next-line no-undef
    expect(sum(1, 2)).toBe(3);
  });
});
