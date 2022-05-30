import React from 'react';
import PropTypes from 'prop-types';

class QuantityCart extends React.Component {
  handleInputQuantity = (e) => {
    e.preventDefault();
  }

  handleBtnIncrease = ({ target }) => {
    const { value } = target;
    if (value === 'max') {
      return;
    }
    const { handleQuantity, id } = this.props;
    handleQuantity(id, true);
  }

  handleBtnDecrease = () => {
    const { handleQuantity, id } = this.props;
    handleQuantity(id, false);
  }

  render() {
    const { quantityProduct, max } = this.props;
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
          value={ max }
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
  max: PropTypes.string,
};

QuantityCart.defaultProps = {
  max: '',
};

export default QuantityCart;
