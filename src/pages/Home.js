import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  state = {
    redirect: false,
    queryInput: '',
  }

  handleBtnCart = () => {
    this.setState({
      redirect: true,
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { redirect, queryInput } = this.state;
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
        <label htmlFor="inputSearch">
          <input
            type="query-input"
            id="query-input"
            name="queryInput"
            data-testid="query-input"
            value={ queryInput }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.handleBtnSearch }
        >
          Pesquisar
        </button>
      </>
    );
  }
}

export default Home;
