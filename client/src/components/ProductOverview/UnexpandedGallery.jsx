/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React from 'react';
import ThumbnailCarousel from './ThumbnailCarousel.jsx';

class UnexpandedGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      photos,
      hover,
      onMouseEnter,
      onMouseLeave,
      thumbIndex,
      handleThumbChange,
    } = this.props;
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
          photos={photos}
          thumbIndex={thumbIndex}
          onMouseLeave={onMouseEnter}
          onMouseEnter={onMouseLeave}
          handleThumbChange={handleThumbChange}
        />
      </button>
    );
  }
}

export default UnexpandedGallery;
