/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React from 'react';
// import { motion } from 'framer-motion';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ThumbnailCarousel from './ThumbnailCarousel.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    const { photos } = this.props;
    const endIndex = photos.length > 7 ? 6 : photos.length;
    this.state = {
      startIndex: 0,
      endIndex,
      thumbIndex: 0,
      relX: 0,
      relY: 0,
    };
    this.handleZoomMouseMove = this.handleZoomMouseMove.bind(this);
    this.handleThumbChange = this.handleThumbChange.bind(this);
    this.handleUpArrowClick = this.handleUpArrowClick.bind(this);
    this.handleDownArrowClick = this.handleDownArrowClick.bind(this);
  }

  handleZoomMouseMove(e) {
    const relX = e.clientX - e.target.offsetLeft;
    const relY = e.clientY - e.target.offsetTop;
    this.setState({
      relX,
      relY,
    });
  }

  handleThumbChange(e) {
    e.stopPropagation();
    const thumbIndex = Number(e.target.getAttribute('thumbindex'));
    this.setState({
      thumbIndex,
    });
  }

  handleUpArrowClick(e) {
    e.stopPropagation();
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

  handleDownArrowClick(e) {
    e.stopPropagation();
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
      expandedView,
      hover,
      onMouseEnter,
      onMouseLeave,
      handleExpandClick,
      zoomed,
    } = this.props;
    const {
      startIndex,
      endIndex,
      thumbIndex,
      relX,
      relY,
    } = this.state;
    const mainImage = photos[thumbIndex].url;
    let hoverStyle = 'zoom-in';
    if (expandedView) {
      if (zoomed) {
        hoverStyle = 'zoom-out';
      } else { hoverStyle = 'crosshair'; }
    }
    return (
      <button
        type="button"
        className={expandedView ? "keith-expanded-main-photo": "keith-unexpanded-main-photo"}
        onClick={handleExpandClick}
        onMouseMove={zoomed ? this.handleZoomMouseMove : () => {}}
        style={{
          cursor: hover ? hoverStyle : 'default',
          backgroundImage: `url(${mainImage})`,
          backgroundSize: zoomed ? '250%' : 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: zoomed ? -2.2 * relX + 500 : 'center',
          backgroundPositionY: zoomed ? -2.2 * relY : 'center',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        alt="main image"
      >
        {!zoomed && (
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
        )}
        {!zoomed && (
          <div className="keith-lr-arrows-row" onMouseEnter={onMouseLeave} onMouseLeave={onMouseEnter}>
            {thumbIndex > 0 && (
              <tr className="keith-lr-arrow-container">
                <MdKeyboardArrowLeft className="keith-lr-arrow-button" onClick={this.handleUpArrowClick} />
              </tr>
            )}
            {thumbIndex < photos.length - 1 && (
              <tr className="keith-lr-arrow-container">
                <MdKeyboardArrowRight className="keith-lr-arrow-button" onClick={this.handleDownArrowClick} />
              </tr>
            )}
          </div>
        )}
      </button>
    );
  }
}

export default Gallery;
