/* eslint-disable react/prop-types */
import React from 'react';

export default function StarButton({ toggleOutfit, savedToOutfit }) {
  if (savedToOutfit) {
    return <button type="button" onClick={toggleOutfit}>⭐</button>;
  }
  return <button type="button" onClick={toggleOutfit}>☆</button>;
}
