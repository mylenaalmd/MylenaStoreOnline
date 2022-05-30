import React from 'react';
import PropTypes from 'prop-types';

class InputRating extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <>
        <input
          type="radio"
          value="1"
          name="inputRating"
          data-testid="1-rating"
          onChange={ handleChange }
        />
        <input
          type="radio"
          value="2"
          name="inputRating"
          data-testid="2-rating"
          onChange={ handleChange }
        />
        <input
          type="radio"
          value="3"
          name="inputRating"
          data-testid="3-rating"
          onChange={ handleChange }
        />
        <input
          type="radio"
          value="4"
          name="inputRating"
          data-testid="4-rating"
          onChange={ handleChange }
        />
        <input
          type="radio"
          value="5"
          name="inputRating"
          data-testid="5-rating"
          onChange={ handleChange }
        />
      </>
    );
  }
}

InputRating.propTypes = {
  handleChange: PropTypes.func,
};

InputRating.defaultProps = {
  handleChange: () => {},
};

export default InputRating;
