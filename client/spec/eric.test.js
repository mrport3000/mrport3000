import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { data } from '../../__mocks__/mockProps.js';

import RatingAndReview from '../src/components/RatingsAndReviews/RatingAndReview.jsx';
import SortReviews from '../src/components/RatingsAndReviews/SortReviews.jsx';
import RatingBreakdown from '../src/components/RatingsAndReviews/RatingBreakdown.jsx';
import ReviewsList from '../src/components/RatingsAndReviews/ReviewsList.jsx'
import ReviewTile from '../src/components/RatingsAndReviews/ReviewTile.jsx';
import ProductBreakdown from '../src/components/RatingsAndReviews/ProductBreakdown.jsx';


test('SortReviews is rendered to the page', () => {
  render(<SortReviews reviews={data} />);
  const sortbyFeature = screen.getByText(/sorted/i);
  expect((sortbyFeature)).toBeInTheDocument();
});

test('RatingBreakdown is rendered to the page', () => {
  render(<RatingBreakdown />);
  const percentBreakdown = screen.getByText(/% of reviews recommend this product/i);
  expect((percentBreakdown)).toBeInTheDocument();
});

test('ProductBreakdown is rendered to the page', () => {
  const { container } = render(<ProductBreakdown />);
  expect(container.getElementsByClassName('eric-RR-productBreakdown').length).toBe(1);
});

test('ReviewsList is rendered to the page', () => {
  const { container } = render(<ReviewsList reviews={data} />);
  expect(container.getElementsByClassName('eric-RR-reviewListContainer').length).toBe(1);
});

// test('ReviewTile is rendered to the page', () => {
  //   const { container } = render(<ReviewTile review={data} />);
  //   expect(container.getElementsByClassName('eric-RR-tileEntryContainer').length).toBe(3);
  // });

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