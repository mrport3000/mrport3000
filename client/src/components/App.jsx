import React from 'react';

import RatingAndReview from './RatingsAndReviews/RatingAndReview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        Place Widgets here:
        <RatingAndReview />
      </div>
    );
  }
}

export default App;
