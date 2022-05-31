import React from 'react';
import { Redirect } from 'react-router-dom';
import QuantityCart from '../components/QuantityCart';

class Cart extends React.Component {
  state = {
    productList: '',
    productListReduced: [],
    empty: true,
    redirect: false,
  };

  componentDidMount() {
    this.getLocalStorageList();
  }

  getLocalStorageList = () => {
    const productList = JSON.parse(localStorage.getItem('productId'));
    if (productList) {
      this.setState({ productList }, () => {
        // Referência: https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
        const arr = productList;
        const newArr = arr.reduce((acc, current) => {
          const singleItem = acc.find((item) => item.id === current.id);
          if (!singleItem) {
            return acc.concat([current]);
          }
          return acc;
        }, []);
        this.setState({
          productListReduced: newArr,
          empty: false,
        });
      });
    }
  }

  handleQuantity = (id, change) => {
    if (change) {
      const { productList } = this.state;
      const productAdd = productList.find((item) => item.id === id);
      const arr = [...productList];
      arr.push(productAdd);
      return this.setState({ productList: arr }, () => {
        localStorage.setItem('productId', JSON.stringify(arr));
      });
    }
    const { productList } = this.state;
    const arrayItems = productList.filter((item) => item.id === id);
    arrayItems.shift();
    const arrayWithouItem = productList.filter((item) => item.id !== id);
    const arr = [...arrayWithouItem, ...arrayItems];
    this.setState({ productList: arr }, () => {
      localStorage.setItem('productId', JSON.stringify(arr));
    });
  }

  handleBtnCheckout = () => {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { productList, productListReduced, empty, redirect } = this.state;
    if (redirect) {
      return (
        <Redirect to="/checkout" />
      );
    }
    return (
      <div>
        <section className="cards-content">
          {!empty ? (
            productListReduced.map((product) => (
              <section key={ product.id } className="product-card">
                <h1 data-testid="shopping-cart-product-quantity">
                  {
                    productList
                      .filter((item) => item.id === product.id)
                      .length <= 0 ? 1 : productList
                        .filter((item) => item.id === product.id)
                        .length
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
                  Remover do Carrinho
                </button>
                <QuantityCart
                  quantityProduct={ productList
                    .filter((item) => item.id === product.id)
                    .length <= 0 ? 1 : productList
                      .filter((item) => item.id === product.id)
                      .length }
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
          <button
            data-testid="checkout-products"
            type="button"
            onClick={ this.handleBtnCheckout }
          >
            Finalizar compra
            {productList && (
              <h2
                data-testid="shopping-cart-size"
              >
                {productList.length}

              </h2>
            )}

          </button>
        </section>
      </div>
    );
  }
}

export default Cart;
