import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { storageList } = this.props;
    return (
      <header className="cart-text">
        <h1>Comercio dos Piadistas</h1>
        <div className="login-cart">
          <p>login</p>
          <div>
            <span className="material-symbols-outlined">
              shopping_cart
            </span>
            <div className="count-cart">
              {storageList && (
                <h2
                  data-testid="shopping-cart-size"
                >
                  {storageList.length}

                </h2>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  storageList: PropTypes.arrayOf(
    {},
  ).isRequired,
};

export default Header;
