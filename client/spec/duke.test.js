import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import '../../__mocks__/matchMedia.mock';
import ProductCard from "../src/components/RelatedItems/ProductCard.jsx";
import RelatedProducts from "../src/components/RelatedItems/RelatedProducts.jsx";
import OutFitList from "../src/components/OutFitList/OutFitList.jsx";
import OutfitCard from "../src/components/OutfitList/OutfitCard.jsx";
import { relatedProductsMock } from "../../__mocks__/relatedProductsMock.js";
import { product } from "../../__mocks__/productStylesMock.js";

const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('Related Product Component', () => {
  test('Render Related Product Component', () => {
    render(<RelatedProducts />);
    const relatedProducts = screen.getByText(/related products/i);
    expect(relatedProducts).toBeInTheDocument();
  });

  test('Render Related Product Carousel', () => {
    render(<RelatedProducts relatedProducts={relatedProductsMock} />);
    const productCarousel = screen.getByTestId('product-carousel');
    expect(productCarousel).toBeInTheDocument();
  });

  test('Render Product Card', () => {
    render(<ProductCard product={product} />);
    const productCard = screen.getByTestId('product-card');
    expect(productCard).toBeInTheDocument();
  });
});

describe('Outfit List Component', () => {
  test('Render Outfit List', () => {
    render(<OutFitList outfits={[]} />);
    const outFitList = screen.getByText(/your outfit/i);
    expect(outFitList).toBeInTheDocument();
  });

  test('Render Outfit Card', () => {
    render(<OutfitCard product={product} />);
    const outfitCard = screen.getByTestId('outfit-card');
    expect(outfitCard).toBeInTheDocument();
  });
});
