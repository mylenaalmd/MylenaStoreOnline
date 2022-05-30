import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Details extends React.Component {
    state = {
      product: {},
      productList: '',
      redirect: false,
      inputRating: 0,
      email: '',
      mensagem: '',
      evaluations: [],
      hasEvaluations: false,
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
      this.getLocalStorageEvaluations();
    }

    getLocalStorageEvaluations = () => {
      const { evaluations } = this.state;
      if (evaluations[0]) {
        const evaluationsList = JSON.parse(localStorage.getItem('evaluations'));
        return this.setState({ evaluations: evaluationsList, hasEvaluations: true });
      }
      this.setState({
        evaluations: [{ email: '', mensagem: '', inputRating: '' }],
      });
    }

    handleBtnCart = () => {
      this.setState({
        redirect: true,
      });
    }

    handleBtnAddCart = () => {
      const { product, productList } = this.state;
      if (productList) {
        const arr = [...productList];
        arr.push(product);
        return this.setState({ productList: arr }, () => {
          localStorage.setItem('productId', JSON.stringify(arr));
        });
      }
      const arr = [];
      arr.push(product);
      this.setState({ productList: arr }, () => {
        localStorage.setItem('productId', JSON.stringify(arr));
      });
    };

    handleChange = (event) => {
      console.log(event.target.value);
      const { target: { value, checked, name } } = event;
      const valor = name === 'email' || name === 'mensagem' ? value : checked;
      if (checked) {
        return this.setState({
          [name]: value,
        });
      }
      this.setState({
        [name]: valor,
      });
    }

    handleSubmit = (e) => {
      const { email, mensagem, inputRating, evaluations } = this.state;
      e.preventDefault();
      const obj = { email, mensagem, inputRating };
      const arr = [...evaluations, obj];
      this.setState({
        evaluations: arr,
        hasEvaluations: true,
        inputRating: 0,
        email: '',
        mensagem: '',
      }, () => localStorage.setItem('evaluations', JSON.stringify(arr)));
    }

    render() {
      const { product: { price, thumbnail, title }, redirect,
        email, mensagem, evaluations, hasEvaluations } = this.state;
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
            <h2
              data-testid="shopping-cart-size"
            >
              { JSON.parse(localStorage.getItem('productId'))
              && JSON.parse(localStorage.getItem('productId')).length }

            </h2>
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
          <div>
            <h3>Avaliação</h3>
            <form>
              <label htmlFor="e-mail">
                <input
                  type="email"
                  value={ email }
                  name="email"
                  data-testid="product-detail-email"
                  placeholder="E-mail"
                  onChange={ this.handleChange }
                />
                <br />
                <input
                  type="radio"
                  value="1"
                  name="inputRating"
                  data-testid="1-rating"
                  onChange={ this.handleChange }
                />
                <input
                  type="radio"
                  value="2"
                  name="inputRating"
                  data-testid="2-rating"
                  onChange={ this.handleChange }
                />
                <input
                  type="radio"
                  value="3"
                  name="inputRating"
                  data-testid="3-rating"
                  onChange={ this.handleChange }
                />
                <input
                  type="radio"
                  value="4"
                  name="inputRating"
                  data-testid="4-rating"
                  onChange={ this.handleChange }
                />
                <input
                  type="radio"
                  value="5"
                  name="inputRating"
                  data-testid="5-rating"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="e-mail">
                <textarea
                  type="text"
                  value={ mensagem }
                  name="mensagem"
                  placeholder="Mensagem (opcional)"
                  data-testid="product-detail-evaluation"
                  onChange={ this.handleChange }
                />
              </label>
              <br />
              <button
                type="submit"
                data-testid="submit-review-btn"
                onClick={ this.handleSubmit }
              >
                Avaliar
              </button>
            </form>
            {hasEvaluations && (
              <div className="evaluations">
                {hasEvaluations && evaluations.map((evaluation) => (
                  <div key={ evaluation.email }>
                    <input
                      type="radio"
                      value="1"
                      name={ `inputRated${evaluation.email}` }
                      checked={ evaluation.inputRating === '1' }
                    />
                    <input
                      type="radio"
                      value="2"
                      name={ `inputRated${evaluation.email}` }
                      checked={ evaluation.inputRating === '2' }
                    />
                    <input
                      type="radio"
                      value="3"
                      name={ `inputRated${evaluation.email}` }
                      checked={ evaluation.inputRating === '3' }
                    />
                    <input
                      type="radio"
                      value="4"
                      name={ `inputRated${evaluation.email}` }
                      checked={ evaluation.inputRating === '4' }
                    />
                    <input
                      type="radio"
                      value="5"
                      name={ `inputRated${evaluation.email}` }
                      checked={ evaluation.inputRating === '5' }
                    />
                    <p>
                      { evaluation.email }
                    </p>
                    <p>
                      { evaluation.mensagem }
                    </p>
                  </div>
                ))}
              </div>)}
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
