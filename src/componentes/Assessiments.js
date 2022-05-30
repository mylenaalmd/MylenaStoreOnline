import React from 'react';

class Assessment extends React.Component {
  state = {
    radio: '',
    email: '',
    mensagem: '',
  }

handleChange = (event) => {
  const { target } = event;
  if (target.type === 'email') {
    this.setState({ email: event.target.value });
  } this.setState({ mensagem: event.target.value });
}

handleRadio = () => {
  const { radio } = this.state;
}

render() {
  const { radio, email, mensagem } = this.state;
  return (
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
          <input type="radio" value="1" data-testid="${index}-rating" />
          <input type="radio" value="2" data-testid="${index}-rating" />
          <input type="radio" value="3" data-testid="${index}-rating" />
          <input type="radio" value="4" data-testid="${index}-rating" />
          <input type="radio" value="5" data-testid="${index}-rating" />
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
          type="button"
          data-testid="submit-review-btn"
        >
          Avaliar
        </button>
      </form>
    </div>
  );
}
}

export default Assessment;
