import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    redirect: false,
    queryInput: '',
    categories: '',
    products: [],
    searched: false,
    storageList: [],
  }

  componentDidMount() {
    this.getListCategories();
    this.getLocalStorageList();
  }

  getLocalStorageList = () => {
    const productList = JSON.parse(localStorage.getItem('productId'));
    this.setState({
      storageList: productList,
    });
  }

  getListCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ categories: categoriesList });
  };

  // arrumando git
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

  handleBtnAddCart = ({ target }) => {
    const { products, storageList } = this.state;
    const { name } = target;
    const product = products.find((item) => item.id === name);
    if (storageList) {
      const arr = [...storageList];
      arr.push(product);
      return this.setState({ storageList: arr }, () => {
        localStorage.setItem('productId', JSON.stringify(arr));
      });
    }
    const arr = [];
    arr.push(product);
    this.setState({ storageList: arr }, () => {
      localStorage.setItem('productId', JSON.stringify(arr));
    });
  }

  handleCategorySearch = async ({ target }) => {
    const responseApi = await getProductsFromCategoryAndQuery(target.id, null);
    const { results } = await responseApi;
    this.setState({
      products: results,
      searched: true,
    });
    // getProductsFromCategoryAndQuery();
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
        <div className="categories-content">
          {categories && categories.map((category) => (
            <label htmlFor={ category.id } key={ category.id }>
              {category.name}
              <input
                data-testid="category"
                input="category"
                type="radio"
                id={ category.id }
                onClick={ this.handleCategorySearch }
              />
            </label>

          ))}
        </div>
        <section className="products-content">
          <section className="search-bar">
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
                type="text"
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
          </section>
          <section className="cards-content">
            {products[0] && (
              products.map((product) => (
                <section key={ product.id } className="product-card">
                  <Link
                    to={ `/details/${product.id}` }
                    key={ product.id }
                    data-testid="product-detail-link"
                  >
                    <div data-testid="product">
                      <img src={ product.thumbnail } alt={ product.title } />
                      <h4>
                        Preço:
                        { product.price }
                      </h4>
                      <p>{ product.title }</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    name={ product.id }
                    onClick={ this.handleBtnAddCart }
                  >
                    Adicionar ao Carrinho
                  </button>
                </section>
              )))}
          </section>
          {!products[0] && searched && <p>Nenhum produto foi encontrado</p>}
        </section>
      </section>
    );
  }
}

export default Home;
