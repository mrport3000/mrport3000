import React from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import OutfitCard from './OutfitCard.jsx';
import AddOutfit from './AddOutfit.jsx';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: 0,
      endIndex: 2,
    };
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
  }

  handleBackArrowClick() {
    this.setState((prevState) => ({
      startIndex: prevState.startIndex - 1,
      endIndex: prevState.endIndex - 1,
    }));
  }

  handleForwardArrowClick() {
    this.setState((prevState) => ({
      startIndex: prevState.startIndex + 1,
      endIndex: prevState.endIndex + 1,
    }));
  }

  render() {
    const { startIndex, endIndex } = this.state;
    const { outfits, handleAddOutfitClick, handleRemoveOutfitClick } = this.props;
    console.log('OUTFITS', outfits);
    return (
      <div>
        <h4>YOUR OUTFIT</h4>
        <div className="duke-outfit-carousel-container">
          {startIndex > 0 && (
          <div className="duke-arrow-container">
            <MdArrowBackIos className="duke-arrow-button" onClick={this.handleBackArrowClick} />
          </div>
          )}
          <AddOutfit
            handleAddOutfitClick={handleAddOutfitClick}
          />
          {
            outfits.map((product, index) => {
              if (index >= startIndex && index <= endIndex) {
                return (
                  <OutfitCard
                    product={product}
                    key={index}
                    handleRemoveOutfitClick={handleRemoveOutfitClick}
                  />
                );
              }
            })
          }
          {endIndex < (outfits.length - 1) && (
          <div className="duke-arrow-container">
            <MdArrowForwardIos className="duke-arrow-button" onClick={this.handleForwardArrowClick} />
          </div>
          )}
        </div>
      </div>
    );
  }
}

export default OutfitList;
