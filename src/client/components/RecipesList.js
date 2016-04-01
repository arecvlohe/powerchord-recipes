import React, { Component } from 'react';
import Recipe from './Recipe';

class RecipesList extends Component {
  render() {

    const { store } = this.context;
    const { recipes } = store.getState();
    return (
      <div style={styles.main}>
        {recipes.map((recipe, index) =>
          <Recipe
            key={index}
            recipe={recipe} />
        )}
      </div>
    );
  }
}

RecipesList.contextTypes = {
  store: React.PropTypes.object,
};

const styles = {
  main: {
    padding: 20,
  },
};

export default RecipesList;
