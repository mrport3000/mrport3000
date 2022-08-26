import { render } from "@testing-library/react";
import ProductCard from "../src/components/RelatedItems/ProductCard.jsx";
import '@testing-library/jest-dom';

const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('Related Products Component', () => {
  it('Rendered Product Cards', () => {
    const {} = render(<ProductCard />);
  });
});
