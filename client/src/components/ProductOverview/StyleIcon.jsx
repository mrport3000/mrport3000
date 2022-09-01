/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { MdCheckCircle } from 'react-icons/md';

export default function StyleIcon({ url, index, handleStyleChange, styleIndex }) {
  return (
    <td style={{ border: 'none', margin: 'none' }}>
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
            border: styleIndex === index ? '3px solid darkgoldenrod' : 'none',
            opacity: styleIndex === index ? '80%' : '100%',
          }
        }
        index={index}
        alt={url}
      >
        {styleIndex === index && (<MdCheckCircle className="keith-style-check" />)}
      </button>
    </td>
  );
}
