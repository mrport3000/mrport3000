/* eslint-disable react/prop-types */
import React from 'react';

function ProductInfo({ productInfo, rating, reviewCount }) {
  const { name, category } = productInfo;
  return (
    <>
      <p>{`★★★★☆ Read ${reviewCount} reviews`}</p>
      <h4 className="keith-category">{category}</h4>
      <h1 className="keith-product-name">{name}</h1>
    </>
  );
}

export default ProductInfo;
