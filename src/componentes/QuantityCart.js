import React from 'react';
import PropTypes from 'prop-types';

class QuantityCart extends React.Component {
  state = {
    quantity: 1,
  }

  handleInputQuantity = (e) => {
    e.preventDefault();
  }

  handleBtnIncrease = () => {
    const { handleQuantity, id } = this.props;
    this.setState((previousState) => ({
      quantity: previousState.quantity + 1,
    }));
    handleQuantity(id, true);
  }

  handleBtnDecrease = () => {
    const { handleQuantity, id } = this.props;
    this.setState((previousState) => ({
      quantity: previousState.quantity - 1,
    }));
    handleQuantity(id, false);
  }

  render() {
    const { quantity } = this.state;
    return (
      <div className="increaseDecreaseItem">
        <button
          type="button"
          onClick={ this.handleBtnDecrease }
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <input
          type="text"
          id="inputQuantity"
          value={ quantity }
          onChange={ this.handleInputQuantity }
        />
        <button
          type="button"
          onClick={ this.handleBtnIncrease }
          data-testid="product-increase-quantity"
        >
          +
        </button>
      </div>
    );
  }
}

QuantityCart.propTypes = {
  handleQuantity: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default QuantityCart;
