import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { productInfo } from '../../__mocks__/productInfoMock.js';
import { product } from '../../__mocks__/productStylesMock.js';

import ProductOverview from '../src/components/ProductOverview/OverviewIndex.jsx';
import ProductDescription from '../src/components/ProductOverview/ProductDescription.jsx';
import ProductInfo from '../src/components/ProductOverview/ProductInfo.jsx';
import StyleSelector from '../src/components/ProductOverview/StyleSelector.jsx';
import AddToCart from '../src/components/ProductOverview/AddToCart.jsx';
import Gallery from '../src/components/ProductOverview/Gallery.jsx';

const { averageRating, totalReviews, availableSizes } = require('../src/utilities');

const ratings = {
  1: '6',
  2: '1',
  3: '1',
  4: '4',
  5: '8',
};

const { styles } = product;

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
test('ProductOverview is rendered to the page', () => {
  const { container } = render(<ProductOverview
    productInfo={productInfo}
    productStyles={styles}
    rating={averageRating(ratings)}
    reviewCount={totalReviews(ratings)}
  />);
  expect(container.getElementsByClassName('keith-overview-div').length).toBe(1);
});
test('ProductDescription is rendered to the page', () => {
  const { container } = render(<ProductDescription
    productInfo={productInfo}
  />);
  expect(container.getElementsByClassName('keith-desc-div').length).toBe(1);
});
test('ProductInfo is rendered to the page', () => {
  const { container } = render(<ProductInfo
    productInfo={productInfo}
    rating={averageRating(ratings)}
    reviewCount={totalReviews(ratings)}
    originalPrice={styles[0].original_price}
    salePrice={styles[0].sale_price}
    styleName={styles[0].name}
  />);
  expect(container.getElementsByClassName('keith-category').length).toBe(1);
});
test('StyleSelector is rendered to the page', () => {
  const { container } = render(<StyleSelector
    productStyles={styles}
    styleIndex={0}
  />);
  expect(container.getElementsByClassName('keith-style-selector-div').length).toBe(1);
});
test('AddToCart is rendered to the page', () => {
  const { container } = render(<AddToCart
    productInfo={productInfo}
    skus={skus}
  />);
  expect(container.getElementsByClassName('keith-cart-div').length).toBe(1);
});
test('Gallery is rendered to the page', () => {
  const { container } = render(<Gallery
    photos={styles[0].photos}
    expandedView={false}
    hover={false}
    zoomed={false}
  />);
  expect(container.getElementsByClassName('keith-unexpanded-main-photo').length).toBe(1);
});