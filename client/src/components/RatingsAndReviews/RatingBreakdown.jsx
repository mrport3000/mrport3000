import React from 'react';

import StarRating from '../RelatedItems/StarRating.jsx';
import './RatingAndReview.css';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    };
    this.ratingFrequency = this.ratingFrequency.bind(this);
    this.toggleStarRating = this.toggleStarRating.bind(this);
    this.resetStarFilter = this.resetStarFilter.bind(this);
  }

  ratingFrequency(target, arr) {
    const soloRating = arr.filter((el) => target === el);
    return `${(soloRating.length / this.props.ratings.ratings.length) * 100}%`;
  }

  toggleStarRating(e) {
    if (this.state[e.target.name] === 0) {
      this.setState({ [`${e.target.name}`]: e.target.value }, () => this.props.liftRating(this.state));
    } else if (this.state[e.target.name] > 0) {
      this.setState({ [`${e.target.name}`]: 0 }, () => this.props.liftRating(this.state));
    }
  }

  resetStarFilter() {
    this.setState({
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    }, () => this.props.liftRating(this.state));
  }

  render() {
    if (this.props.ratings.ratings.length === 0) {
      return <div />;
    }
    const checkState = Object.keys(this.state).filter((key) => this.state[key] >= 1);
    let resetFilter;

    if (checkState.length >= 2) {
      resetFilter = (
        <div className="eric-RR-rsfText">
          <span onClick={() => this.resetStarFilter(this.state)}>Click here to remove all filters.</span>
        </div>
      );
    }

    return (
      <div className="eric-RR-productRatingContainer">
        <div className="eric-RR-productRatingAverage">
          <div className="eric-RR-productAverageText">
            {this.props.ratings.average}
          </div>
          <div className="eric-RR-productStarRating">
            <StarRating rating={Number(this.props.ratings.average)} />
          </div>
        </div>
        <div className="eric-RR-ratingContainer">
          <div className="eric-RR-breakdownText">
            {this.props.ratings.recPercent}
            % of reviews recommend this product
          </div>
          <div className="eric-RR-starBreakdown">
            <div className="eric-RR-5starContainer">
              <div className="eric-RR-5left">
                <button type="button" className="eric-rr-rbButton" name="fiveStar" value={5} onClick={this.toggleStarRating}>5 stars</button>
              </div>
              <div className="eric-RR-5center">
                <div className="eric-RR-5bar" style={{ width: this.ratingFrequency(5, this.props.ratings.ratings), height: '25px', backgroundColor: '#F76C5E' }} />
              </div>
            </div>

            <div className="eric-RR-4starContainer">
              <div className="eric-RR-4left">
                <button type="button" className="eric-rr-rbButton" name="fourStar" value={4} onClick={this.toggleStarRating}>4 stars</button>
              </div>
              <div className="eric-RR-4center">
                <div className="eric-RR-4bar" style={{ width: this.ratingFrequency(4, this.props.ratings.ratings), height: '25px', backgroundColor: '#F76C5E' }} />
              </div>
            </div>

            <div className="eric-RR-3starContainer">
              <div className="eric-RR-3left">
                <button type="button" className="eric-rr-rbButton" name="threeStar" value={3} onClick={this.toggleStarRating}>3 stars</button>
              </div>
              <div className="eric-RR-3center">
                <div className="eric-RR-3bar" style={{ width: this.ratingFrequency(3, this.props.ratings.ratings), height: '25px', backgroundColor: '#F76C5E' }} />
              </div>
            </div>

            <div className="eric-RR-2starContainer">
              <div className="eric-RR-2left">
                <button type="button" className="eric-rr-rbButton" name="twoStar" value={2} onClick={this.toggleStarRating}>2 stars</button>
              </div>
              <div className="eric-RR-2center">
                <div className="eric-RR-2bar" style={{ width: this.ratingFrequency(2, this.props.ratings.ratings), height: '25px', backgroundColor: '#F76C5E' }} />
              </div>
            </div>

            <div className="eric-RR-1starContainer">
              <div className="eric-RR-1left">
                <button type="button" className="eric-rr-rbButton" name="oneStar" value={1} onClick={this.toggleStarRating}>1 stars</button>
              </div>
              <div className="eric-RR-1center">
                <div className="eric-RR-1bar" style={{ width: this.ratingFrequency(1, this.props.ratings.ratings), height: '25px', backgroundColor: '#F76C5E' }} />
              </div>
            </div>

          </div>
        </div>
        <div className="eric-RR-resetStarFilter">
          {resetFilter}
        </div>
      </div>
    );
  }
}

export default RatingBreakdown;
