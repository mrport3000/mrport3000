/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import StyleIcon from './StyleIcon.jsx';

export default function StyleSelector({ productStyles, handleStyleChange, styleIndex }) {
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
    if (i === productStyles.length - 1 && thumbnailRow.length < 4) {
      thumbnailTable.push(thumbnailRow);
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
                index={Number(Object.keys(cell)[0])}
                styleIndex={styleIndex}
                handleStyleChange={handleStyleChange}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
