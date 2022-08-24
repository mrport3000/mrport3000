/* eslint-disable react/prop-types */
import React from 'react';
import Select from 'react-select';
import { availableSizes } from '../../utilities';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    const { skus } = this.props;
    this.state = {
      skus: skus,
      selectedSize: 'test',
      sizeSelected: false,
      selectedQuantity: '',
      quantitySelected: false,
      quantityAvailable: '-',
      inStock: true,
      saveToOutfit: false,
    };
    this.changeSize = this.changeSize.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeSize(e) {
    const { skus } = this.state;
    let { quantity } = Object.values(skus).find((item) => item.size === e.value);
    if (quantity > 15) {
      quantity = 15;
    }
    this.setState({
      sizeSelected: true,
      selectedSize: e.value,
      quantityAvailable: quantity,
    });
  }

  changeQuantity(e) {
    this.setState({
      quantitySelected: true,
      selectedQuantity: e.value,
    });
  }

  render() {
    const { skus, quantityAvailable, sizeSelected, saveToOutfit } = this.state;
    const sizeOptions = availableSizes(skus).map((size) => ({ value: size, label: size }));
    let quantityOptions, placeholder;
    if (sizeSelected) {
      quantityOptions = Array.from({ length: quantityAvailable }, (_, i) => i + 1);
      placeholder = quantityOptions[0];
    } else {
      quantityOptions = [{ value: 1, label: 1 }];
      placeholder = '-';
    }
    quantityOptions = quantityOptions.map((quantity) => ({ value: quantity, label: quantity }));
    const starButton = saveToOutfit ? <button type="button">★</button> : <button type="button">☆</button>;
    if (sizeOptions === []) {
      return (
        <div style={{ width: '400px' }}>
          <p><b>OUT OF STOCK</b></p>
          <div style={{ width: '250px', float: 'left' }}>
            <Select options={sizeOptions} onChange={this.changeSize} isDisabled placeholder="Select Size" />
          </div>
          <div style={{ width: '100px' }}>
            <Select
              options={quantityOptions}
              onChange={this.changeQuantity}
              isDisabled
              placeholder={placeholder}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="keith-size-quantity-div">
          <div style={{ width: '250px', float: 'left' }}>
            <Select options={sizeOptions} onChange={this.changeSize} placeholder="Select Size" />
          </div>
          <div style={{ width: '100px', float: 'right' }}>
            <Select
              options={quantityOptions}
              onChange={this.changeQuantity}
              isDisabled={!sizeSelected}
              placeholder={placeholder}
            />
          </div>
        </div>
        <div className="keith-cart-star-div">
          <button type="button">Add to Cart</button>
          {starButton}
        </div>
      </div>
    );
  }
}

export default AddToCart;
