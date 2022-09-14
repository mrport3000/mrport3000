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
  const backupPhoto = "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?b=1&k=20&m=1332167985&s=170667a&w=0&h=O-084eNJBhGZGJbJvNvUC1P6d4aSo6XkV4Kom7ZZcIQ=";
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
                backgroundImage: `url(${photo.thumbnail_url || backupPhoto})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: 'center',
                backgroundPositionY: 'center',
                border: thumbIndex - startIndex === index ? '4px solid #F76C5E' : 'none',
                borderRadius: '10px',
                opacity: thumbIndex - startIndex === index ? '80%' : '100%',
              }
            }
              thumbindex={index + startIndex}
              key={photo.thumbnail_url || backupPhoto}
              alt={photo.thumbnail_url || backupPhoto}
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
