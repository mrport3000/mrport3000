/* eslint-disable react/prop-types */
import React from 'react';

export default function CartModal({ showModal, quantity, size, name }) {
  if (!showModal) {
    return null;
  }
  return (
    <div className="keith-modal">
      <h2>
        <b>{name}</b>
        {' added to cart! '}
        <b>{'Quantity: '}</b>
        {quantity}
        <b>{', Size: '}</b>
        {size}
      </h2>
    </div>
  );
}
