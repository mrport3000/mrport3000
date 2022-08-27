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
    this.setState((prevState) => ({
      startIndex: prevState.startIndex - 1,
      endIndex: prevState.endIndex - 1,
    }));
  }

  handleDownArrowClick() {
    this.setState((prevState) => ({
      startIndex: prevState.startIndex + 1,
      endIndex: prevState.endIndex + 1,
    }));
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
    );
  }
}

export default UnexpandedGallery;
