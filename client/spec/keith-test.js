const { averageRating, totalReviews, availableSizes } = require('../src/utilities');

// Keith's tests
const ratings = {
  1: '6',
  2: '1',
  3: '1',
  4: '4',
  5: '8',
};

const skus = {
  2580773: {
    quantity: 14,
    size: '7',
  },
  2580774: {
    quantity: 25,
    size: '7.5',
  },
  2580775: {
    quantity: 9,
    size: '8',
  },
  2580776: {
    quantity: 2,
    size: '8.5',
  },
  2580777: {
    quantity: 18,
    size: '9',
  },
  2580778: {
    quantity: 12,
    size: '9.5',
  },
  2580779: {
    quantity: 10,
    size: '10',
  },
  2580780: {
    quantity: 18,
    size: '10.5',
  },
  2580781: {
    quantity: 11,
    size: '11',
  },
  2580782: {
    quantity: 35,
    size: '11.5',
  },
  2580783: {
    quantity: 25,
    size: '12',
  },
};

test('adds up total reviews', () => {
  expect(totalReviews(ratings)).toBe(20);
});
test('averages reviews', () => {
  expect(averageRating(ratings)).toBe(3.35);
});
test('returns avilableSizes', () => {
  expect(availableSizes(skus)).toStrictEqual([
    '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12',
  ]);
});
