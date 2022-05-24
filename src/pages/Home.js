import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  state = {
    redirect: false,
  }

  handleBtnCart = () => {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return (
        <Redirect to="/cart" />
      );
    }
    return (
      <>
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleBtnCart }
        >
          Cart
        </button>
      </>
    );
  }
}

export default Home;
