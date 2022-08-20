import React from 'react';
import ReactDOM from 'react-dom';

function CompareModal({
  show, handleModalButtonClick, cardProduct, currProduct
}) {
  if (!show) {
    return null;
  }
  console.log('Current Product', currProduct);
  // create unique feature obj from product features  and currProduct features
  const prodFeatures = cardProduct.features.reduce((acc, item) => {
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

  const rowCreator = allFeaturesArr.map((value) => {
    if (currFeatures[value] === true) {
      currFeatures[value] = <img alt="checkmark" className="duke-checkmark" src="https://icon-library.com/images/green-check-mark-icon-png/green-check-mark-icon-png-13.jpg" />;
    }
    if (prodFeatures[value] === true) {
      prodFeatures[value] = <img alt="checkmark" className="duke-checkmark" src="https://icon-library.com/images/green-check-mark-icon-png/green-check-mark-icon-png-13.jpg" />;
    }
    return (
      <tr key={value}>
        <td>{currFeatures[value] ? currFeatures[value] : ''}</td>
        <td>{value}</td>
        <td>{prodFeatures[value] ? prodFeatures[value] : ''}</td>
      </tr>
    );
  });

  return ReactDOM.createPortal(
    (
      <div className="duke-modal">
        <div className="duke-modal-content">
          <div className="duke-modal-body">
            <table>
              <thead>
                <tr>
                  <th>Current Product Name</th>
                  <th>&nbsp;</th>
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
