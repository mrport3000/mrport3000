/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { MdCheckCircle } from 'react-icons/md';

export default function StyleIcon({ url, index, handleStyleChange, styleIndex }) {
  const backupPhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd02zeVLQ2fKKrq6VtQ5fSEvkIGaefaaJTcA&usqp=CAU";
  return (
    <td style={{ border: 'none', margin: 'none' }}>
      <button
        type="button"
        className="keith-style-icon"
        onClick={handleStyleChange}
        style={
          {
            backgroundImage: `url(${url || backupPhoto})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
            border: styleIndex === index ? '3px solid #F76C5E' : 'white',
            borderRadius: '50%',
            opacity: styleIndex === index ? '80%' : '100%',
          }
        }
        index={index}
        alt={url || backupPhoto}
      >
        {styleIndex === index && (<MdCheckCircle className="keith-style-check" />)}
      </button>
    </td>
  );
}
