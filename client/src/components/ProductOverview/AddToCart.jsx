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
    const { skus, quantityAvailable, sizeSelected } = this.state;
    const sizeOptions = availableSizes(skus).map((size) => ({ value: size, label: size }));
    let quantityOptions, placeholder;
    if (sizeSelected) {
      quantityOptions = Array.from({ length: quantityAvailable }, (_, i) => i + 1);
      placeholder = quantityOptions[0];
    } else {
      quantityOptions = [1];
      placeholder = '-';
    }
    quantityOptions = quantityOptions.map((quantity) => ({ value: quantity, label: quantity }));
    return (
      <div className="keith-options-row">
        <Select options={sizeOptions} onChange={this.changeSize} placeholder="Select Size" />
        <Select
          options={quantityOptions}
          onChange={this.changeQuantity}
          isDisabled={!sizeSelected}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default AddToCart;
