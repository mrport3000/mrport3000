import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Promise } from 'bluebird';
import ProductCard from './ProductCard.jsx';
import CompareModal from './CompareModal.jsx';
import { averageRating } from '../../utilities.js'

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultEndIndex: 3,
      startIndex: 0,
      endIndex: 3,
      show: false,
      relatedProducts: [],
      cardProduct: {},
    };
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
    this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
    this.getRelatedProductsInfo = this.getRelatedProductsInfo.bind(this);
  }

  componentDidMount() {
    this.adjustForScreenSize();
    this.getRelatedProductsInfo(this.props.productId);
  }

  componentDidUpdate(prevProps) {
    const { defaultEndIndex } = this.state;
    // console.log('PRE PROPS', prevProps.productId);
    // console.log('CURRENT PROPS', this.props.productId);
    if (prevProps.productId !== this.props.productId) {
      // console.log('INSIDE COMPONENT UPDATE IF STATEMENT');
      this.getRelatedProductsInfo(this.props.productId);
      this.setState({
        startIndex: 0,
        endIndex: defaultEndIndex,
      });
    }
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

  handleModalButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { relatedProducts } = this.state;

    // retrieves productId from product card to pass to modal
    const prodId = e.target.getAttribute('value');
    const newCardProduct = relatedProducts.filter((product) => Number(prodId) === product.id);
    this.setState({ cardProduct: newCardProduct[0] });

    // Show modal
    this.setState((prevState) => ({ show: !prevState.show }));
  }

  getRelatedProductsInfo(id) {
    return axios.get(`/related/${id}`)
      .then((result) => {
        this.setState({
          relatedProducts: result.data,
        });
      });
  }

  adjustForScreenSize() {
    const { startIndex } = this.state;
    let query = `(max-width: 950px)`;

    if (window.matchMedia('(max-width: 950px)').matches) {
      this.setState({
        defaultEndIndex: 1,
        endIndex: startIndex + 1,
      });
    } else if (window.matchMedia('(min-width: 951px) and (max-width: 1250px)').matches) {
      this.setState({
        defaultEndIndex: 2,
        endIndex: startIndex + 2,
      });
      query = '(min-width: 951px) and (max-width: 1250px)';
    } else {
      this.setState({
        defaultEndIndex: 3,
        endIndex: startIndex + 3,
      });
      query = '(min-width: 1251px)';
    }
    const media = window.matchMedia(query);
    media.addEventListener('change', () => this.adjustForScreenSize());
  }

  render() {
    const {
      show, startIndex, endIndex, relatedProducts, cardProduct,
    } = this.state;

    const { currProduct, handleProductCardClick } = this.props;

    return (
      <div className="duke-products-container">
        <div className="duke-products-inner">
          <h2>RELATED PRODUCTS</h2>
          <div className="duke-product-carousel-container" data-testid="product-carousel">
            {
              startIndex > 0
              && (
              <div className="duke-arrow-container">
                <IconContext.Provider value={{ className: "duke-arrow-button" }}>
                  <MdArrowBackIos onClick={this.handleBackArrowClick} />
                </IconContext.Provider>
              </div>
              )
            }
            {
              startIndex === 0
              && (
              <div className="duke-arrow-container">
                <IconContext.Provider value={{ className: "duke-arrow-hide" }}>
                  <MdArrowBackIos />
                </IconContext.Provider>
              </div>
              )
            }
            <CompareModal
              show={show}
              handleModalButtonClick={this.handleModalButtonClick}
              cardProduct={cardProduct}
              currProduct={currProduct}
            />
            {
              relatedProducts.map((product, index) => {
                if (index >= startIndex && index <= endIndex) {
                  return (
                    <ProductCard
                      product={product}
                      key={product.name}
                      handleModalButtonClick={this.handleModalButtonClick}
                      handleProductCardClick={handleProductCardClick}
                    />
                  );
                }
              })
            }
            {
              endIndex !== (relatedProducts.length - 1)
              && endIndex < relatedProducts.length
              && (
              <div className="duke-arrow-container">
                <IconContext.Provider value={{ className: "duke-arrow-button" }}>
                  <MdArrowForwardIos onClick={this.handleForwardArrowClick} />
                </IconContext.Provider>
              </div>
              )
            }
            {
              (relatedProducts.length <= endIndex || endIndex === (relatedProducts.length - 1))
              && (
              <div className="duke-arrow-container">
                <IconContext.Provider value={{ className: "duke-arrow-hide" }}>
                  <MdArrowForwardIos />
                </IconContext.Provider>
              </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

// RelatedProducts.propTypes = {
//   productId: PropTypes.number.isRequired,
//   currProduct: PropTypes.shape({}).isRequired,
//   handleProductCardClick: PropTypes.func.isRequired,
// };

export default RelatedProducts;
