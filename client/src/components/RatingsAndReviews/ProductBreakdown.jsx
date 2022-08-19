import React from 'react';

import productBreakdownPlaceholder from '/Users/eric/work/atelier-project/client/src/utilities/Product-breakdown-placeholder.png'

function ProductBreakdown(props) {
  console.log('props: ', props);

  return (
    <div>
      {/* ProductBreakdown Placeholder! */}
      <div className="eric-RR-productBreakdown">
        <img src={productBreakdownPlaceholder} alt="product placeholder" />
      </div>
    </div>
  );
}

export default ProductBreakdown;
