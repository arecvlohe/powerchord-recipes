import React, { Component } from 'react';

class Ingredient extends Component {
  render() {
    const { ingredient, index } = this.props;
    return (
      <div style={styles.main}>
        <div style={styles.ingredient}>{ingredient}</div>
        <span
          onClick={() => this.handleDeleteIngredient()}>
          X
        </span>
      </div>
    );
  }

  handleDeleteIngredient() {
    this.props.onDeleteClick(this.props.index);
  }
}

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  ingredient: {
    minWidth: 150,
    paddingRight: 20,
  },
};

export default Ingredient;
