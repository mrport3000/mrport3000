/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React from 'react';

class UnexpandedGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      mainPhotoUrl: '',
    };
  }

  componentDidMount() {
    const { photos } = this.props;
    this.setState({
      photos: photos,
      mainPhotoUrl: photos[0].url,
    });
  }

  render() {
    const { photos, hover, onMouseEnter, onMouseLeave } = this.props;
    return (
      <img
        style={{ cursor: hover ? 'zoom-in' : 'default' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        src={photos[0].url}
        width="600"
        height="400"
        object-fit="contain"
        margin="20px"
        alt="main image"
      />
    );
  }
}

export default UnexpandedGallery;
