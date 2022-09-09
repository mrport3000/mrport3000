import React from 'react';
import PropTypes from 'prop-types';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import OutfitCard from './OutfitCard.jsx';
import AddOutfit from './AddOutfit.jsx';
import Placeholder from './Placeholder.jsx';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultEndIndex: 2,
      startIndex: 0,
      endIndex: 2,
    };
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
  }

  componentDidMount() {
    this.adjustForScreenSize();
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

  adjustForScreenSize() {
    const { startIndex } = this.state;
    let query = '(max-width: 950px)';

    if (window.matchMedia('(max-width: 950px)').matches) {
      this.setState({
        defaultEndIndex: 0,
        startIndex: 0,
        endIndex: 0,
      });
    } else if (window.matchMedia('(min-width: 951px) and (max-width: 1250px)').matches) {
      this.setState({
        defaultEndIndex: 1,
        startIndex: 0,
        endIndex: 1,
      });
      query = '(min-width: 951px) and (max-width: 1250px)';
    } else {
      this.setState({
        defaultEndIndex: 2,
        startIndex: 0,
        endIndex: 2,
      });
      query = '(min-width: 1251px)';
    }
    const media = window.matchMedia(query);
    media.addEventListener('change', () => this.adjustForScreenSize());
  }

  // Adds hidden cards to OutfitList to maintain spacing
  outfitFiller() {
    const { outfits } = this.props;
    const { defaultEndIndex } = this.state;
    let cardToAdd = (defaultEndIndex + 1) - outfits.length;
    const placeholders = [];
    while (cardToAdd > 0) {
      placeholders.push('placeholder');
      cardToAdd--;
    }
    return placeholders;
  }

  render() {
    const { startIndex, endIndex } = this.state;
    const {
      outfits, handleAddOutfitClick, handleRemoveOutfitClick,
    } = this.props;
    return (
      <div className="duke-outfit-container">
        <div className="duke-outfit-inner">
          <h2>YOUR OUTFIT</h2>
          <div className="duke-outfit-carousel-container">
            {startIndex > 0 && (
            <div className="duke-arrow-container">
              <MdArrowBackIos className="duke-arrow-button" onClick={this.handleBackArrowClick} />
            </div>
            )}
            {startIndex === 0 && (
            <div className="duke-arrow-container">
              <MdArrowBackIos className="duke-arrow-hide" />
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
            {this.outfitFiller().map((fillerProduct, index) => <Placeholder key={index} />)}
            {endIndex < (outfits.length - 1) && (
            <div className="duke-arrow-container">
              <MdArrowForwardIos className="duke-arrow-button" onClick={this.handleForwardArrowClick} />
            </div>
            )}
            {(outfits.length === 0 || endIndex >= outfits.length - 1) && (
            <div className="duke-arrow-container">
              <MdArrowForwardIos className="duke-arrow-hide" />
            </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// OutfitList.propTypes = {
//   outfits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
//   handleAddOutfitClick: PropTypes.func.isRequired,
//   handleRemoveOutfitClick: PropTypes.func.isRequired,
// };

export default OutfitList;
