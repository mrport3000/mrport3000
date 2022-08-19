import React from 'react';
import ReactDOM from 'react-dom';

function CompareModal({
  show, handleModalButtonClick, product, currProduct
}) {
  if (!show) {
    return null;
  }

  // create unique feature obj from product and currProduct
  const prodFeatures = product.features.reduce((acc, item) => {
    const { feature, value } = item;
    return { ...acc, [feature]: value };
  }, {});

  const currFeatures = currProduct.features.reduce((acc, item) => {
    const { feature, value } = item;
    return { ...acc, [feature]: value };
  }, {});

  // create unique array of all features
  const allFeaturesArr = [...new Set(Object.keys(prodFeatures).concat(Object.keys(currFeatures)))];

  console.log('prodFeatures: ', prodFeatures);
  console.log('currFeatures: ', currFeatures);
  console.log('allFeaturesArr: ', allFeaturesArr);

  const rowCreator = allFeaturesArr.map((value) => (
    <tr key={value}>
      <td>{currFeatures[value] ? currFeatures[value] : ''}</td>
      <td>{value}</td>
      <td>{prodFeatures[value] ? prodFeatures[value] : ''}</td>
    </tr>
  ));

  return ReactDOM.createPortal(
    (
      <div className="duke-modal">
        <div className="duke-modal-content">
          <div className="duke-modal-body">
            <table>
              <thead>
                <tr>
                  <th>Current Product Name</th>
                  <td>&nbsp;</td>
                  <th>Compared Product Name</th>
                </tr>
              </thead>
              <tbody>
                {rowCreator}
              </tbody>
            </table>
          </div>
          <div className="duke-modal-footer">
            <button type="button" className="duke-button" onClick={handleModalButtonClick}>Close</button>
          </div>
        </div>
      </div>
    ), document.getElementById('root'),
  );
}

export default CompareModal;
