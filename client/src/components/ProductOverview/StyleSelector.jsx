/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import StyleIcon from './StyleIcon.jsx';

function StyleSelector({ productStyles, handleStyleChange }) {
  const thumbnailTable = [];
  let thumbnailRow = [];
  for (let i = 0; i < productStyles.length; i += 1) {
    const cell = {};
    cell[i] = productStyles[i].photos[0].thumbnail_url;
    thumbnailRow.push(cell);
    if (thumbnailRow.length === 4) {
      thumbnailTable.push(thumbnailRow);
      thumbnailRow = [];
    }
  }
  return (
    <table className="keith-style-selector-div">
      <tbody>
        {thumbnailTable.map((row) => (
          <tr>
            {row.map((cell) => (
              <StyleIcon
                url={Object.values(cell)[0]}
                key={Object.keys(cell)[0]}
                index={Object.keys(cell)[0]}
                handleStyleChange={handleStyleChange}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StyleSelector;
