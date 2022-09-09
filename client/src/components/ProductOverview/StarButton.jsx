/* eslint-disable react/prop-types */
import React from 'react';

export default function StarButton({ toggleOutfit, savedToOutfit, productInfo }) {
  if (savedToOutfit) {
    return <button className="keith-star-button" type="button" onClick={toggleOutfit} value={productInfo.id}>★</button>;
  }
  return <button className="keith-star-button" type="button" onClick={toggleOutfit}>☆</button>;
}
