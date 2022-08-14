import React from 'react';
import OutfitCard from './OutfitCard.jsx';
import AddOutfit from './AddOutfit.jsx';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h4>YOUR OUTFIT</h4>
        <div className="duke-outfitlist">
          <AddOutfit />
          <OutfitCard />
        </div>
      </div>
    );
  }
}

export default OutfitList;
