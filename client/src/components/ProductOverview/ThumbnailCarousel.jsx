/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

class ThumbnailCarousel extends React.Component {
  constructor(props) {
    super(props);
    const { photos } = this.props;
    let endIndex = photos.length > 7 ? 6 : photos.length;
    this.state = {
      startIndex: 0,
      endIndex,
    };
    this.handleUpArrowClick = this.handleUpArrowClick.bind(this);
    this.handleDownArrowClick = this.handleDownArrowClick.bind(this);
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
    let {
      photos,
      thumbIndex,
      onMouseEnter,
      onMouseLeave,
      handleThumbChange,
    } = this.props;
    const { startIndex, endIndex } = this.state;
    photos = photos.slice(startIndex, endIndex + 1);
    return (
      <table>
        <tbody className="keith-thumbnail-column">
          {thumbIndex > 0 && (
            <tr className="keith-arrow-container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <MdKeyboardArrowUp className="keith-arrow-button" onClick={this.handleUpArrowClick} />
            </tr>
          )}
          {photos.map((photo, index) => (
            <tr>
              <td
                className="keith-thumbnail"
                style={
               {
                 margin: '0px',
                 backgroundImage: `url(${photo.thumbnail_url})`,
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat',
                 backgroundPositionX: 'center',
                 backgroundPositionY: 'center',
                 border: thumbIndex - startIndex === index ? '2px solid darkgoldenrod' : 'none',
               }
              }
                thumbIndex={index + startIndex}
                key={photo.thumbnail_url}
                alt={photo.thumbnail_url}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={handleThumbChange}
              />
            </tr>
          ))}
          <tr className="keith-arrow-container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <MdKeyboardArrowDown className="keith-arrow-button" onClick={this.handleDownArrowClick} />
          </tr>
        </tbody>
      </table>
    );
  }
}

export default ThumbnailCarousel;
