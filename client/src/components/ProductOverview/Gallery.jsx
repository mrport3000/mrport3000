/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React from 'react';
// import { motion } from 'framer-motion';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdFullscreenExit } from 'react-icons/md';
import ThumbnailCarousel from './ThumbnailCarousel.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relX: 0,
      relY: 0,
    };
    this.handleZoomMouseMove = this.handleZoomMouseMove.bind(this);
  }

  handleZoomMouseMove(e) {
    const relX = e.pageX - e.target.offsetLeft;
    const relY = e.pageY - e.target.offsetTop;
    this.setState({
      relX,
      relY,
    });
  }

  render() {
    const {
      relX,
      relY,
    } = this.state;
    const {
      photos,
      startIndex,
      endIndex,
      thumbIndex,
      expandedView,
      hover,
      onMouseEnter,
      onMouseLeave,
      handleExpandClick,
      handleUnexpandClick,
      handleThumbChange,
      handleUpArrowClick,
      handleDownArrowClick,
      zoomed,
    } = this.props;
    const backupPhoto = "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?b=1&k=20&m=1332167985&s=170667a&w=0&h=O-084eNJBhGZGJbJvNvUC1P6d4aSo6XkV4Kom7ZZcIQ=";
    const mainImage = photos[thumbIndex].url || backupPhoto;
    const img = new Image();
    img.src = mainImage;
    const mainImageWidth = img.naturalWidth;
    const mainImageHeight = img.naturalHeight;
    const aspectRatio = mainImageWidth / mainImageHeight;
    const expandedWidth = 1200;
    const expandedHeight = 700;
    let hoverStyle = 'zoom-in';
    if (expandedView) {
      if (zoomed) {
        hoverStyle = 'zoom-out';
      } else { hoverStyle = 'crosshair'; }
    }
    return (
      <button
        type="button"
        className="keith-main-photo"
        title="Main Photo"
        onClick={handleExpandClick}
        onMouseMove={zoomed ? this.handleZoomMouseMove : () => {}}
        style={{
          width: expandedView ? expandedWidth : '675px',
          height: expandedView ? expandedHeight : '450px',
          justifyContent: zoomed ? 'flex-end' : 'space-between',
          alignItems: zoomed ? 'flex-start' : 'flex-end',
          transition: 'width .5s, height .5s',
          cursor: hover ? hoverStyle : 'default',
          backgroundImage: `url(${mainImage})`,
          backgroundSize: zoomed ? `auto ${2.5 * expandedHeight}px` : 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundOrigin: 'padding-box',
          backgroundPositionX: zoomed ? (-2.5 * aspectRatio * expandedHeight + expandedWidth) * (relX / expandedWidth) : 'center',
          backgroundPositionY: zoomed ? (-2.5 * expandedHeight + expandedHeight) * (relY / expandedHeight) : 'center',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        alt="main image"
      >
        {!zoomed && (
          <>
            <ThumbnailCarousel
              key={startIndex}
              startIndex={startIndex}
              endIndex={endIndex}
              photos={photos}
              thumbIndex={thumbIndex}
              onMouseLeave={onMouseEnter}
              onMouseEnter={onMouseLeave}
              handleThumbChange={handleThumbChange}
              handleUpArrowClick={handleUpArrowClick}
              handleDownArrowClick={handleDownArrowClick}
            />
            <div className="keith-lr-arrows-row" onMouseEnter={onMouseLeave} onMouseLeave={onMouseEnter}>
              {thumbIndex > 0 && (
                <div className="keith-lr-arrow-container">
                  <MdKeyboardArrowLeft className="keith-lr-arrow-button" onClick={handleUpArrowClick} />
                </div>
              )}
              {thumbIndex < photos.length - 1 && (
                <div className="keith-lr-arrow-container">
                  <MdKeyboardArrowRight className="keith-lr-arrow-button" onClick={handleDownArrowClick} />
                </div>
              )}
            </div>
          </>

        )}
        <div className="keith-fullscreen-exit-container">
          {expandedView && <MdFullscreenExit className="keith-fullscreen-exit" onMouseLeave={onMouseEnter} onMouseEnter={onMouseLeave} onClick={handleUnexpandClick} />}
        </div>
      </button>
    );
  }
}

export default Gallery;
