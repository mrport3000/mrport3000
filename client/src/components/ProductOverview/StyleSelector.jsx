/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import StyleIcon from './StyleIcon.jsx';

export default function StyleSelector({ productStyles, handleStyleChange, styleIndex }) {
  const thumbnailTable = [];
  let thumbnailRow = [];
  for (let i = 0; i < productStyles.length; i += 1) {
    const style = {};
    const styleName = productStyles[i].name;
    style[styleName] = productStyles[i].photos[0].thumbnail_url;
    thumbnailRow.push(style);
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
        {thumbnailTable.map((row, i) => (
          <tr key={i}>
            {row.map((style, j) => (
              <StyleIcon
                url={Object.values(style)[0]}
                key={Object.keys(style)[0]}
                index={i * 4 + j}
                name={Object.keys(style)[0]}
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
