import React from 'react';

import axios from 'axios';
import { format } from 'date-fns';
import { GrCheckmark } from 'react-icons/gr';
import StarRating from '../RelatedItems/StarRating.jsx';
import ImageModal from './ImageModal.jsx';

import './RatingAndReview.css';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      helpful: null,
      clickedImg: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
    this.expandTextBody = this.expandTextBody.bind(this);
  }

  handleClick(e) {
    const reviewId = this.props.review.review_id;
    if (e.target.name === 'helpful') {
      // axios PUT request
      axios.get(`/reviews/${reviewId}/helpful`)
        .then((result) => {
          console.log('success: ', result);
          this.setState({ helpful: true });
        });
    }
  }

  handleImgClick(imgUrl) {
    this.setState({ clickedImg: imgUrl });
  }

  expandTextBody(text) {
    const { expanded } = this.state;
    const storedText = text;
    return expanded ? storedText : text.toString().split('').slice(0, 250);
  }

  render() {
    console.log('ReviewTile props: ', this.props);
    const { expanded, helpful, clickedImg } = this.state;
    let reviewBody;
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

    if (this.props.review.body.length >= 250) {
      reviewBody = (
        <div className="eric-RR-tBodyContainer">
          <div className="eric-RR-tBodyText">
            {this.expandTextBody(this.props.review.body)}
          </div>
          <div className="eric-RR-tBodyMore">
            <span
              onClick={() => this.setState({ expanded: true })}
              hidden={expanded === true ? 'hidden' : ''}
            >
              Show more
            </span>
          </div>
        </div>
      );
    } else {
      reviewBody = (
        <div className="eric-RR-tBodyContainer">
          <div className="eric-RR-tBodyText">
            {this.props.review.body}
          </div>
        </div>
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
            {reviewBody}
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
            <button type="button" name="helpful" onClick={this.handleClick} disabled={helpful === true}>Yes</button>
            {' '}
            (
            { helpful === null ? this.props.review.helpfulness : this.props.review.helpfulness + 1}
            ) |
            {' '}
            <button type="button" name="report" onClick={this.handleClick}>Report</button>
          </div>
        </div>
        {clickedImg && (<ImageModal clickedImg={clickedImg} handleClick={this.handleImgClick} />)}
      </div>
    );
  }
}

export default ReviewTile;
