/* eslint-disable react/prop-types */
import React from 'react';
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
    // this.changeSize = this.changeSize.bind(this);
  }

  changeSize(e) {
    console.log(e.target.value);
    this.setState({
      sizeSelected: true,
      selectedSize: e.target.value,
    });
  }

  render() {
    const { skus, selectedSize } = this.state;
    const sizes = availableSizes(skus);
    return (
      <select name="sizeSelector" onChange={this.ChangeSize}>
        <option>Select Size</option>
        {sizes.map((size) => <option value={`option ${size}`}>{`${size}`}</option>)}
      </select>
    );
  }
}

export default AddToCart;
