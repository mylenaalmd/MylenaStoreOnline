import React from 'react';

class Cart extends React.Component {
state = {
  productList: '',
  quantity: '',
};

componentDidMount() {
  this.getLocalStorageList();
}

  getLocalStorageList = () => {
    const productList = JSON.parse(localStorage.getItem('productId'));
    const quantity = productList.length;
    // console.log(productList);
    this.setState({ productList, quantity });
  }

  render() {
    const { productList, quantity } = this.state;
    return (
      <div>
        <h1 data-testid="shopping-cart-product-quantity">{quantity}</h1>
        <section className="cards-content">
          {productList ? (
            productList.map((product) => (
              <section key={ product.id } className="product-card">
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
