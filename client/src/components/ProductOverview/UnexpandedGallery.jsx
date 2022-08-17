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
    const { mainPhotoUrl } = this.state;
    return (
      <img
        src={mainPhotoUrl}
        width="650"
        height="450"
        margin="10"
        float="center"
        alt="main image"
      />
    );
  }
}

export default UnexpandedGallery;
