/* eslint-disable react/prop-types */
import React from 'react';

function ProductInfo({
  productInfo, reviewCount, originalPrice, salePrice, styleName
}) {
  const { name, category } = productInfo;
  const price = salePrice ? (
    <p>
      <b className="keith-sale-price">{`$${salePrice} `}</b>
      <strike>{` $${originalPrice}`}</strike>
    </p>
  ) : <p><b>{`$${originalPrice}`}</b></p>;
  const reviewComponent = reviewCount > 0 ? <p className="keith-review">{`★★★★☆ Read ${reviewCount} reviews`}</p> : <div />;
  return (
    <>
      {reviewComponent}
      <h4 className="keith-category">{category}</h4>
      <h1 className="keith-product-name">{name}</h1>
      <p className="keith-price">{price}</p>
      <p className="keith-style">
        <b>{'Style > '}</b>
        {styleName}
      </p>
    </>
  );
}

export default ProductInfo;
