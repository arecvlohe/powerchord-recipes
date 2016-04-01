import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Recipe extends Component {

  render() {
    const { recipe } = this.props;
    return (
      <div style={styles.main}>
        <Link
          to={'/edit/' + recipe.id}
          style={styles.link}>
        {recipe.title}
        </Link>
        <button
          style={styles.button}
          onClick={() => this.handleDeleteRecipe()}>
        X</button>
      </div>
    );
  }

  handleDeleteRecipe(recipe) {
    this.context.store.dispatch({
      type: 'DELETE_RECIPE',
      id: this.props.recipe.id,
    });
  }
}

Recipe.contextTypes = {
  store: React.PropTypes.object,
};

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    fontfamily: 'Source Sans Pro',
    border: '1px solid black',
    width: 500,
    padding: 15,
    borderRadius: '.5em',
    margin: '20px 0',
  },
  button: {
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: 24,
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    fontSize: 24,
    flexGrow: 2,
  },
};

export default Recipe;
