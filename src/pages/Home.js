import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    redirect: false,
    queryInput: '',
    categories: '',
    products: [],
    searched: false,
  }

  componentDidMount() {
    this.getListCategories();
  }

  getListCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ categories: categoriesList });
  };

  handleBtnCart = () => {
    this.setState({
      redirect: true,
    });
  }

  handleBtnSearch = async ({ target }) => {
    const { name } = target;
    const responseApi = await getProductsFromCategoryAndQuery(null, name);
    const results = await responseApi.results;
    this.setState({
      products: results,
      searched: true,
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { categories, redirect, queryInput, products, searched } = this.state;
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
          name={ queryInput }
        >
          Pesquisar
        </button>
        {products[0] && (
          products.map((product) => (
            <div data-testid="product" key={ product.id }>
              <p>{ product.title }</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>
                Preço:
                { product.price }
              </p>
            </div>
          )))}
        {!products[0] && searched && <p>Nenhum produto foi encontrado</p>}
      </section>
    );
  }
}

export default Home;
