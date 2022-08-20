import React from 'react';

function CompareModal({ show, handleModalButtonClick }) {
  if (!show) {
    return null;
  }
  return (
    <div className="duke-modal">
      <div className="duke-modal-content">
        <div className="duke-modal-body">
          <table>
            <tr>
              <th>Current Product Name</th>
              <td>&nbsp;</td>
              <th>Compared Product Name</th>
            </tr>
            <tr>
              <td>Current Product Value</td>
              <td>Characteristic</td>
              <td>Compare Product Value</td>
            </tr>
          </table>
        </div>
        <div className="duke-modal-footer">
          <button type="button" className="duke-button" onClick={handleModalButtonClick}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default CompareModal;
