import React from 'react';
import Header from '../components/Header';

class Checkout extends React.Component {
  state={
    productList: '',
  }

  componentDidMount() {
    this.getLocalStorageList();
  }

  getLocalStorageList = () => {
    const productList = JSON.parse(localStorage.getItem('productId'));
    this.setState({
      productList,
    });
  }

  handleBtnSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        <Header storageList={ productList } />
        <form className="formCheckout">
          <h1>Informações pessoais para conclusão do pedido:</h1>
          <label htmlFor="checkout-fullname">
            Nome completo:
            <input
              id="checkout-fullname"
              data-testid="checkout-fullname"
              type="text"
            />
          </label>
          <label htmlFor="checkout-email">
            E-mail:
            <input
              id="checkout-email"
              data-testid="checkout-email"
              type="email"
            />
          </label>
          <label htmlFor="checkout-cpf">
            Cpf:
            <input
              id="checkout-cpf"
              data-testid="checkout-cpf"
              type="text"
            />
          </label>
          <label htmlFor="checkout-phone">
            Telefone:
            <input
              id="checkout-phone"
              data-testid="checkout-phone"
              type="text"
            />
          </label>
          <label htmlFor="checkout-cep">
            CEP:
            <input
              id="checkout-cep"
              data-testid="checkout-cep"
              type="text"
            />
          </label>
          <label htmlFor="checkout-address">
            Endereço:
            <input
              id="checkout-address"
              data-testid="checkout-address"
              type="text"
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleBtnSubmit }
          >
            Finalizar compra
          </button>
        </form>
      </div>
    );
  }
}

export default Checkout;
