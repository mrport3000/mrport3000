/* eslint-disable import/extensions */
import React from 'react';

import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import SortReviews from './SortReviews.jsx';
import './RatingAndReview.css';

class RatingAndReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [
        {
          review_id: 1254289,
          rating: 2,
          summary: 'These pants are ok!',
          recommend: false,
          response: '',
          body: 'A little tight on the waist.',
          date: '2022-01-05T00:00:00.000Z',
          reviewer_name: 'bigbrother',
          helpfulness: 8,
          photos: [
            {
              id: 2414654,
              url: 'https://images.unsplash.com/photo-1560829675-11dec1d78930?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80',
            },
            {
              id: 2414655,
              url: 'https://images.unsplash.com/photo-1549812474-c3cbd9a42eb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
            },
            {
              id: 2414656,
              url: 'https://images.unsplash.com/photo-1559709319-3ae960cda614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
            },
          ],
        },
        {
          review_id: 1254287,
          rating: 4,
          summary: 'These pants are fine',
          recommend: true,
          response: '',
          body: 'I do like these pants',
          date: '2019-03-21T00:00:00.000Z',
          reviewer_name: 'shopaddict',
          helpfulness: 2,
          photos: [],
        },
        {
          review_id: 1275994,
          rating: 5,
          summary: 'Great pants!',
          recommend: true,
          response: null,
          body: 'This is just what I was looking for! very comfortable!!!',
          date: '2020-07-25T00:00:00.000Z',
          reviewer_name: 'Palatino',
          helpfulness: 3,
          photos: [],
        },
        {
          review_id: 1275998,
          rating: 5,
          summary: 'dajkjkashjkdfa',
          recommend: true,
          response: null,
          body: 'dahjkdhajkhdjkahdjkahdjkahjdahjkdhajdhjakhdjkahdjkahdjkahdjkahdkjahjdkahjdashkdjkashdjkahdjkashdjkashdjkashdjkasjdhiqowwueioueiwoq eiqwoeqiuwhjkqherqjwiyuiqwyqwkhrkqwhreqwiyrqwkhrjqwkhrqwiyruqiwyrhujqwhrjqkhrqwiuyrqwkwhrqwjkrghquiyrqwkhrqjkhrqiyruqwihrqjwkrhuqiwhruqihriqyrqwhhruiqirhguiqwyrqwkhrhqiwrghqwuiyghrqwhrquiwghriqhrquwrhuiqhruiqwhruqihrqihruiwqruqwiygriqwyhrqwoiy4382yrhkjhrio2hrasjkbfhkjwqhfkqh',
          date: '2018-07-25T00:00:00.000Z',
          reviewer_name: 'testLength',
          helpfulness: 19,
          photos: [],
        },
        {
          review_id: 1275995,
          rating: 3,
          summary: 'Quality is ok! ',
          recommend: true,
          response: null,
          body: 'The quality is ok but the size runs a little small!',
          date: '2016-07-25T00:00:00.000Z',
          reviewer_name: 'palatinoTest',
          helpfulness: 0,
          photos: [],
        },
      ],
    };
  }

  render() {
    return (
      <div className="eric-RR-container">
        <div className="eric-RR-breakdown">
          <div className="eric-RR-ratingBreakdown">
            <RatingBreakdown />
          </div>
          <div className="eric-RR-productBreakdown">
            <ProductBreakdown />
          </div>
        </div>
        <div className="eric-RR-sortReviews">
          <SortReviews reviews={this.state.reviews} />
        </div>
      </div>
    );
  }
}

export default RatingAndReview;
