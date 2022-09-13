import React from 'react';
import { format } from 'date-fns';
import { GrCheckmark } from 'react-icons/gr';
import StarRating from '../RelatedItems/StarRating.jsx';
import ImageModal from './ImageModal.jsx';

import './RatingAndReview.css';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedImg: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
  }

  handleClick(e) {
    console.log('Yes was clicked!');
  }

  handleImgClick(imgUrl) {
    console.log('imgUrl: ', imgUrl)
    this.setState({ clickedImg: imgUrl });
  }

  render() {
    const { clickedImg } = this.state;
    let recommend;
    let photos;
    if (this.props.review.recommend) {
      recommend = (
        <div>
          <GrCheckmark />
          I recommend this product
        </div>
      );
    }
    if (this.props.review.photos) {
      photos = (
        this.props.review.photos.map((photo) => (
          <img
            alt="User review uploaded photo"
            src={photo.url}
            onClick={() => this.handleImgClick(photo.url)}
          />
        ))
      );
    }

    return (
      <div className="eric-RR-tileEntryContainer">
        <div className="eric-RR-tileRatingAndUsername">
          <div className="eric-RR-tileRating">
            <StarRating rating={this.props.review.rating} />
          </div>
          <div className="eric-RR-tileUsername">
            {this.props.review.reviewer_name}
            ,
            {' '}
            {format(new Date(this.props.review.date), 'MM/dd/yyyy')}
          </div>
        </div>
        <div className="eric-RR-tileMainBody">
          <div className="eric-RR-tileSummary">
            {this.props.review.summary}
          </div>
          <div className="eric-RR-tileBody">
            {this.props.review.body}
          </div>
          <div className="eric-RR-tileRecommend">
            {recommend}
          </div>
          <div className="eric-RR-tilePhotos">
            {photos}
          </div>
        </div>
        <div className="eric-RR-tileResponseAndHelpful">
          <div className="eric-RR-tileResponse">
            { <b>Response:</b> && this.props.review.response}
          </div>
          <div className="eric-RR-tileHelpful">
            Was this review helpful?
            {' '}
            <a onClick={this.handleClick}>Yes</a>
            {' '}
            (
            {this.props.review.helpfulness}
            ) |
            {' '}
            <a>Report</a>
          </div>
        </div>
        {clickedImg && (<ImageModal clickedImg={clickedImg} handleClick={this.handleImgClick} />)}
      </div>
    );
  }
}

export default ReviewTile;
