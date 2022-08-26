/* eslint-disable react/prop-types */
import React from 'react';

export default function StarButton({ toggleOutfit, savedToOutfit, productInfo }) {
  if (savedToOutfit) {
    return <button type="button" onClick={toggleOutfit} value={productInfo.id}>⭐</button>;
  }
  return <button type="button" onClick={toggleOutfit}>☆</button>;
}
