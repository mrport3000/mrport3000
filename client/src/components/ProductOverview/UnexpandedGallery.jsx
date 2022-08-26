/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React from 'react';

class UnexpandedGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnailIndex: 0,
    };
  }

  render() {
    const {
      photos,
      hover,
      onMouseEnter,
      onMouseLeave,
    } = this.props;
    const { thumbnailIndex } = this.state;
    const { mainImage } = photos[thumbnailIndex].url;
    return (
      <img
        style={{ cursor: hover ? 'zoom-in' : 'default' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        src={photos[thumbnailIndex].url}
        width="600px"
        height="400px"
        object-fit="contain"
        alt="main image"
      />
    );
  }
}

export default UnexpandedGallery;
