import React from 'react';
import PropTypes from 'prop-types';

class QuantityCart extends React.Component {
  handleInputQuantity = (e) => {
    e.preventDefault();
  }

  handleBtnIncrease = () => {
    const { handleQuantity, id } = this.props;
    handleQuantity(id, true);
  }

  handleBtnDecrease = () => {
    const { handleQuantity, id } = this.props;
    handleQuantity(id, false);
  }

  render() {
    const { quantityProduct } = this.props;
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
          value={ quantityProduct }
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
  quantityProduct: PropTypes.number.isRequired,
};

export default QuantityCart;
