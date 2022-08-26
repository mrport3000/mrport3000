/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

function StyleIcon({ url, index, handleStyleChange }) {
  return (
    <td>
      <img
        onClick={handleStyleChange}
        src={url}
        width="90"
        height="90"
        object-fit="cover"
        margin="8"
        border="none"
        index={index}
        alt={url}
      />
    </td>
  );
}
export default StyleIcon;
