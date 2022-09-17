/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { MdCheckCircle } from 'react-icons/md';

export default function StyleIcon({ url, name, index, handleStyleChange, styleIndex }) {
  const backupPhoto = "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?b=1&k=20&m=1332167985&s=170667a&w=0&h=O-084eNJBhGZGJbJvNvUC1P6d4aSo6XkV4Kom7ZZcIQ=";
  return (
    <td style={{ border: 'none', margin: 'none', boxShadow: 'none' }}>
      <button
        type="button"
        title={name}
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
