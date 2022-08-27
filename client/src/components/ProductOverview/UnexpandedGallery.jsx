/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React from 'react';
import ThumbnailCarousel from './ThumbnailCarousel.jsx';

class UnexpandedGallery extends React.Component {
  constructor(props) {
    super(props);
    const { photos } = this.props;
    const endIndex = photos.length > 7 ? 6 : photos.length;
    this.state = {
      startIndex: 0,
      endIndex,
      thumbIndex: 0,
    };
    this.handleThumbChange = this.handleThumbChange.bind(this);
    this.handleUpArrowClick = this.handleUpArrowClick.bind(this);
    this.handleDownArrowClick = this.handleDownArrowClick.bind(this);
  }

  handleThumbChange(e) {
    const thumbIndex = e.target.getAttribute('thumbIndex');
    this.setState({
      thumbIndex,
    });
  }

  handleUpArrowClick() {
    const {
      startIndex,
      endIndex,
      thumbIndex,
    } = this.state;
    if (thumbIndex > startIndex) {
      this.setState({
        thumbIndex: thumbIndex - 1,
      });
    } else {
      this.setState({
        startIndex: startIndex - 1,
        endIndex: endIndex - 1,
        thumbIndex: thumbIndex - 1,
      });
    }
  }

  handleDownArrowClick() {
    const {
      startIndex,
      endIndex,
      thumbIndex,
    } = this.state;
    if (thumbIndex < endIndex) {
      this.setState({
        thumbIndex: thumbIndex + 1,
      });
    } else {
      this.setState({
        startIndex: startIndex + 1,
        endIndex: endIndex + 1,
        thumbIndex: thumbIndex + 1,
      });
    }
  }

  render() {
    const {
      photos,
      hover,
      onMouseEnter,
      onMouseLeave,
    } = this.props;
    const {
      startIndex,
      endIndex,
      thumbIndex,
    } = this.state;
    const mainImage = photos[thumbIndex].url;
    return (
      <div className="keith-unexpanded-gallery-div">
        <button
          type="button"
          className="keith-unexpanded-main-photo"
          style={
            {
              cursor: hover ? 'zoom-in' : 'default',
              backgroundImage: `url(${mainImage})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPositionX: 'center',
            }
          }
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          alt="main image"
        >
          <ThumbnailCarousel
            key={startIndex}
            startIndex={startIndex}
            endIndex={endIndex}
            photos={photos}
            thumbIndex={thumbIndex}
            onMouseLeave={onMouseEnter}
            onMouseEnter={onMouseLeave}
            handleThumbChange={this.handleThumbChange}
            handleUpArrowClick={this.handleUpArrowClick}
            handleDownArrowClick={this.handleDownArrowClick}
          />
        </button>
      </div>
    );
  }
}

export default UnexpandedGallery;
