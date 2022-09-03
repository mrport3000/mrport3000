/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

export default function ThumbnailCarousel({
  photos,
  startIndex,
  endIndex,
  thumbIndex,
  onMouseEnter,
  onMouseLeave,
  handleThumbChange,
  handleUpArrowClick,
  handleDownArrowClick,
}) {
  const thumbPhotos = photos.slice(startIndex, endIndex + 1);
  return (
    <table>
      <tbody className="keith-thumbnail-column">
        <tr className="keith-ud-arrow-container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {thumbIndex > 0 && (<MdKeyboardArrowUp className="keith-ud-arrow-button" onClick={handleUpArrowClick} />)}
        </tr>
        {thumbPhotos.map((photo, index) => (
          <tr key={index}>
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
                opacity: thumbIndex - startIndex === index ? '80%' : '100%',
              }
            }
              thumbindex={index + startIndex}
              key={photo.thumbnail_url}
              alt={photo.thumbnail_url}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={handleThumbChange}
            />
          </tr>
        ))}
        <tr className="keith-ud-arrow-container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {thumbIndex < photos.length - 1 && (<MdKeyboardArrowDown className="keith-ud-arrow-button" onClick={handleDownArrowClick} />)}
        </tr>
      </tbody>
    </table>
  );
}
