import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    redirect: false,
    queryInput: '',
    categories: '',
  }

  componentDidMount() {
    this.getListCategories();
  }

  getListCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ categories: categoriesList });
    console.log(categoriesList);
  };

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
    const { categories, redirect, queryInput } = this.state;
    if (redirect) {
      return (
        <Redirect to="/cart" />
      );
    }
    return (
      <section className="main-content">
        <div>
          {categories && categories.map((category) => (
            <label htmlFor={ category.id } key={ category.id }>
              {category.name}
              <input
                data-testid="category"
                input="category"
                type="radio"
                id={ category.id }
              />
            </label>

          ))}
        </div>
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
      </section>
    );
  }
}

export default Home;
