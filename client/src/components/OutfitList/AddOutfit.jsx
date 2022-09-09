import React from 'react';
import PropTypes from 'prop-types';

function AddOutfit({ handleAddOutfitClick }) {
  return (
    <button type="submit" className="duke-addoutfit-container" onClick={handleAddOutfitClick}>
      <img className="duke-addoutfit-image" src="https://cdn-icons-png.flaticon.com/512/32/32339.png" alt="add outfit" />
      <p>Add to Outfit</p>
    </button>
  );
}

// AddOutfit.propTypes = {
//   handleAddOutfitClick: PropTypes.func.isRequired,
// };

export default AddOutfit;
