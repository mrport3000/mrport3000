import React from 'react';

function AddOutfit({ handleAddOutfitClick }) {
  return (
    <button type="submit" className="duke-addoutfit-container" onClick={handleAddOutfitClick}>
      <img className="duke-addoutfit-image" src="https://cdn-icons-png.flaticon.com/512/32/32339.png" alt="add outfit" />
      <p>Add to Outfit</p>
    </button>
  );
}

export default AddOutfit;
