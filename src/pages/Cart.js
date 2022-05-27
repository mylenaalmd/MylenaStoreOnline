import React from 'react';
import QuantityCart from '../componentes/QuantityCart';

class Cart extends React.Component {
  state = {
    productList: '',
  };

  componentDidMount() {
    this.getLocalStorageList();
  }

  getLocalStorageList = () => {
    const productList = JSON.parse(localStorage.getItem('productId'));
    this.setState({ productList });
  }

  handleQuantity = (id, change) => {
    if (change) {
      const { productList } = this.state;
      const productAdd = productList.find((item) => item.id === id);
      this.setState((previousState) => ({
        productList: [...previousState.productList, productAdd],
      }));
      return localStorage.setItem('productId', JSON.stringify(productList));
    }
    const { productList } = this.state;
    const productPop = productList.filter((item) => item.id !== id);
    this.setState({
      productList: productPop,
    });
    localStorage.setItem('productId', JSON.stringify(productList));
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        <section className="cards-content">
          {productList ? (
            productList.map((product) => (
              <section key={ product.id } className="product-card">
                <h1 data-testid="shopping-cart-product-quantity">
                  {
                    productList.filter((item) => item.id === product.id).length
                  }
                </h1>
                <div data-testid="product">
                  <img src={ product.thumbnail } alt={ product.title } />
                  <h4>
                    Preço:
                    { product.price }
                  </h4>
                  <p data-testid="shopping-cart-product-name">{ product.title }</p>
                </div>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  // onClick={ () => this.handleBtnCart(product.id) }
                >
                  Remover ao Carrinho
                </button>
                <QuantityCart
                  id={ product.id }
                  handleQuantity={ this.handleQuantity }
                />
              </section>
            )))
            : (
              <p data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </p>
            )}
        </section>
      </div>
    );
  }
}

export default Cart;
