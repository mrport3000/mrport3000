import React, { Fragment } from 'react';
import axios from 'axios';
import { IconContext } from 'react-icons';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import ProductCard from './ProductCard.jsx';
import CompareModal from './CompareModal.jsx';

const dummyData = [
  {
    category: 'Jacket 0',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    default_price: 140,
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-jackets-1601401814.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  }, {
    category: 'Jacket 1',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    default_price: 140,
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/biker-jackets-1657569423.png?crop=0.819xw:1.00xh;0.181xw,0&resize=640:*',
  }, {
    category: 'Jacket 2',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    default_price: 140,
    url: 'https://n.nordstrommedia.com/id/sr3/603baeb0-804c-4585-8da8-00038d1500cf.jpeg?h=365&w=240&dpr=2',
  }, {
    category: 'Jacket 3',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    default_price: 140,
    url: 'https://m.media-amazon.com/images/I/617SHXZ3mXL._AC_UL320_.jpg',
  }, {
    category: 'Jacket 4',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    default_price: 140,
    url: 'https://imageio.forbes.com/specials-images/imageserve/621907c6a1c1d351180dadb8/Buck-Mason-Dry-Waxed-Canvas-N1-Deck-Jacket-10/960x0.jpg?format=jpg&width=960',
  },
];

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    // manages indexes shown in carousel
    this.state = {
      startIndex: 0,
      endIndex: 2,
      show: false,
    };
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
    this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
  }

  componentDidMount() {
  }


  handleBackArrowClick() {
    this.setState({
      startIndex: this.state.startIndex - 1,
      endIndex: this.state.endIndex - 1,
    });
  }

  handleForwardArrowClick() {
    this.setState({
      startIndex: this.state.startIndex + 1,
      endIndex: this.state.endIndex + 1,
    });
  }

  handleModalButtonClick() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <>
        <CompareModal show={this.state.show} handleModalButtonClick={this.handleModalButtonClick} />
        <h4>RELATED PRODUCTS</h4>
        <div className="duke-product-carousel-container">
          {
            this.state.startIndex > 0
            && (
            <div className="duke-arrow-container">
              <IconContext.Provider value={{ className: "duke-arrow-button" }}>
                <MdArrowBackIos onClick={this.handleBackArrowClick} />
              </IconContext.Provider>
            </div>
            )
          }
          {
            dummyData.map((product, index) => {
              if (index >= this.state.startIndex && index <= this.state.endIndex) {
                return (
                  <ProductCard
                    product={product}
                    key={index}
                    handleModalButtonClick={this.handleModalButtonClick}
                  />
                );
              }
            })
          }
          {
            this.state.endIndex !== (dummyData.length - 1)
            && (
            <div className="duke-arrow-container">
              <IconContext.Provider value={{ className: "duke-arrow-button" }}>
                <MdArrowForwardIos onClick={this.handleForwardArrowClick} />
              </IconContext.Provider>
            </div>
            )
          }
        </div>
      </>
    );
  }
}

export default RelatedProducts;
