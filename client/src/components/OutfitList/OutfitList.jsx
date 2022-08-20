import React from 'react';
import Promise from 'bluebird';
import localStorage from 'local-storage';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import OutfitCard from './OutfitCard.jsx';
import AddOutfit from './AddOutfit.jsx';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: 0,
      endIndex: 1,
      outfits: [],
    };
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
    this.handleAddOutfitClick = this.handleAddOutfitClick.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   outfits: localStorage.get('outfitList') || [],
    // });
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

  handleAddOutfitClick(e) {
    e.preventDefault();
    console.log('BUTTON CLICK');

    // Combine Product Info and Styles to one object
    let currentProduct = this.props.productInfo;
    currentProduct.styles = this.props.productStyles.results;

    this.setState((prevState) => ({
      outfits: prevState.outfits.push(currentProduct),
    }));
    console.log('OUTFFIT STATE', this.state.outfits);

    localStorage.set('outfitList', this.state.outfits);

    console.log('LOCAL STORAGE', localStorage.get('outfitList'));
  }

  render() {
    const { outfits, startIndex, endIndex } = this.state;
    console.log('OUTFITS', outfits);
    return (
      <>
        <h4>YOUR OUTFIT</h4>
        <div className="duke-outfit-carousel-container">
          {startIndex > 0 && (
          <div className="duke-arrow-container">
            <MdArrowBackIos className="duke-arrow-button" onClick={this.handleBackArrowClick} />
          </div>
          )}
          <AddOutfit
            handleAddOutfitClick={this.handleAddOutfitClick}
          />
          {
            outfits.map((product, index) => {
              if (index >= startIndex && index <= endIndex) {
                return <OutfitCard product={product} key={index} />;
              }
            })
          }
          {endIndex < (outfits.length - 1) && (
          <div className="duke-arrow-container">
            <MdArrowForwardIos className="duke-arrow-button" onClick={this.handleForwardArrowClick} />
          </div>
          )}
        </div>
      </>
    );
  }
}

export default OutfitList;



// const dummyData = [
//   {
//     category: 'Jacket 0',
//     description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
//     default_price: 140,
//     url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-jackets-1601401814.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
//   }, {
//     category: 'Jacket 1',
//     description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
//     default_price: 140,
//     url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/biker-jackets-1657569423.png?crop=0.819xw:1.00xh;0.181xw,0&resize=640:*',
//   }, {
//     category: 'Jacket 2',
//     description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
//     default_price: 140,
//     url: 'https://n.nordstrommedia.com/id/sr3/603baeb0-804c-4585-8da8-00038d1500cf.jpeg?h=365&w=240&dpr=2',
//   }, {
//     category: 'Jacket 3',
//     description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
//     default_price: 140,
//     url: 'https://m.media-amazon.com/images/I/617SHXZ3mXL._AC_UL320_.jpg',
//   }, {
//     category: 'Jacket 4',
//     description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
//     default_price: 140,
//     url: 'https://imageio.forbes.com/specials-images/imageserve/621907c6a1c1d351180dadb8/Buck-Mason-Dry-Waxed-Canvas-N1-Deck-Jacket-10/960x0.jpg?format=jpg&width=960',
//   },
// ];