import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function CompareModal({
  show, handleModalButtonClick, cardProduct, currProduct,
}) {
  if (!show) {
    return null;
  }

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

  const rowCreator = allFeaturesArr.map((value) => {
    if (currFeatures[value] === true) {
      currFeatures[value] = <img alt="checkmark" className="duke-checkmark" src="https://icon-library.com/images/green-check-mark-icon-png/green-check-mark-icon-png-13.jpg" />;
    }
    if (prodFeatures[value] === true) {
      prodFeatures[value] = <img alt="checkmark" className="duke-checkmark" src="https://icon-library.com/images/green-check-mark-icon-png/green-check-mark-icon-png-13.jpg" />;
    }
    return (
      <tr key={value}>
        <td className="duke-table-sides">{currFeatures[value] ? currFeatures[value] : ''}</td>
        <td className="duke-table-middle">{value}</td>
        <td className="duke-table-sides">{prodFeatures[value] ? prodFeatures[value] : ''}</td>
      </tr>
    );
  });

  return (
    <div className="duke-modal">
      <div className="duke-modal-content">
        <p>Product Comparison</p>
        <div className="duke-modal-body">
          <table>
            <thead>
              <tr>
                <th className="duke-table-sides duke-table-head">{currProduct.name}</th>
                <th className="duke-table-middle" id="duke-table-head-middle">&nbsp;</th>
                <th className="duke-table-sides duke-table-head">{cardProduct.name}</th>
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
  );
}

export default CompareModal;

// Automerge
