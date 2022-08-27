/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

function StyleIcon({ url, index, handleStyleChange, styleIndex }) {
  return (
    <td style={
      {
        border: 'none',
        margin: '0px',
      }
    }
    >
      <button
        type="button"
        className="keith-style-icon"
        onClick={handleStyleChange}
        style={
          {
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
            border: styleIndex === index ? '2px solid darkgoldenrod' : 'none',
          }
        }
        index={index}
        alt={url}
      />
    </td>
  );
}
export default StyleIcon;
