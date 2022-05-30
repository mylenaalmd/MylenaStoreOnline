import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Details extends React.Component {
    state = {
      product: {},
      productList: [],
      redirect: false,
    }

    async componentDidMount() {
      const { match: { params: { id } } } = this.props;
      const url = `https://api.mercadolibre.com/items/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      const list = JSON.parse(localStorage.getItem('productId'));
      this.setState({
        product: data,
        productList: list,
      });
    }

    handleBtnCart = () => {
      this.setState({
        redirect: true,
      });
    }

    handleBtnAddCart = () => {
      const { product, productList } = this.state;
      const arrayItems = [...productList, product];
      this.setState({ productList: arrayItems });
      localStorage.setItem('productId', JSON.stringify(arrayItems));
    }

    render() {
      const { product: { price, thumbnail, title }, redirect, productList } = this.state;
      if (redirect) {
        return (
          <Redirect to="/cart" />
        );
      }
      return (
        <div>
          <p data-testid="product-detail-name">{ title }</p>
          <img src={ thumbnail } alt={ title } />
          <p>{ price }</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.handleBtnAddCart }
          >
            Adicionar ao Carrinho
            {productList && (
              <h2
                data-testid="shopping-cart-size"
              >
                {/* Logica feita para fazer acessar o localStorage na renderização */}
                {JSON.parse(localStorage.getItem('productId')).length}

              </h2>
            )}
          </button>
          <div>
            <button
              data-testid="shopping-cart-button"
              type="button"
              onClick={ this.handleBtnCart }
            >
              Carrinho de compras
            </button>
          </div>
        </div>
      );
    }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Details;
