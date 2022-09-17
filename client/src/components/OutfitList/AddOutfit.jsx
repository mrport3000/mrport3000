import React from 'react';
import PropTypes from 'prop-types';
import SalmonPlus from '../../../dist/lib/Salmon_Plus.png';
import WhitePlus from '../../../dist/lib/White_Plus.png';
import BlackPlus from '../../../dist/lib/Black_Plus.png';

function AddOutfit({ handleAddOutfitClick, theme }) {
  const plusSign = theme === 'light' ? SalmonPlus : WhitePlus;
  return (
    <button type="submit" className="duke-addoutfit-container" onClick={handleAddOutfitClick}>
      <img className="duke-addoutfit-image" src={plusSign} alt="add outfit" />
      <p>Add to Outfit</p>
    </button>
  );
}

// AddOutfit.propTypes = {
//   handleAddOutfitClick: PropTypes.func.isRequired,
// };

export default AddOutfit;
