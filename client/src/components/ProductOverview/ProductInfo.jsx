/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import halfStar from '../../../dist/lib/star-half.png';
import fullStar from '../../../dist/lib/star-full.png';
import quarterStar from '../../../dist/lib/star-one-quarter.png';
import threeQuarterStar from '../../../dist/lib/star-three-quarter.png';
import emptyStar from '../../../dist/lib/star-outline.png';
import StarRating from '../RelatedItems/StarRating.jsx';

function ProductInfo({
  productInfo, reviewCount, originalPrice, salePrice, styleName, executeScroll, rating,
}) {
  const { name, category } = productInfo;
  const price = salePrice ? (
    <p className="keith-style">
      <b className="keith-sale-price">{`$${salePrice} `}</b>
      <strike>{` $${originalPrice}`}</strike>
    </p>
  ) : <p className="keith-style"><b>{`$${originalPrice}`}</b></p>;
  if (reviewCount > 0) {
    return (
      <>
        <div className="keith-review">
          {StarRating({ rating })}
          <p onClick={executeScroll}>{`Read ${reviewCount} reviews`}</p>
        </div>
        <h4 className="keith-category">{category}</h4>
        <h1 className="keith-product-name">{name}</h1>
        {price}
        <p className="keith-style">
          <b>{'Style > '}</b>
          {styleName}
        </p>
      </>
    );
  }
  return (
    <>
      <h4 className="keith-category">{category}</h4>
      <h1 className="keith-product-name">{name}</h1>
      {price}
      <p className="keith-style">
        <b>{'Style > '}</b>
        {styleName}
      </p>
    </>
  );
}

export default ProductInfo;
