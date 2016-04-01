import * as types from '../constants/ActionTypes';

const initialState = [
  {
    id: 0,
    title: 'Scrambled Eggs',
    description: 'Good scrambled eggs',
    ingredients: ['Eggs', 'Cheese', 'Peppers', 'Onions'],
  },
  {
    id: 1,
    title: 'Toast',
    description: 'Nothin better than burnt toast',
    ingredients: ['Toast', 'Milk', 'Orange Juice', 'Porage'],
  },
];

function recipes(state = initialState, action) {
  switch (action.type) {
    case types.ADD_RECIPE:
      return state.concat({
        id: state.reduce((maxId, recipe) => Math.max(recipe.id, maxId), -1) + 1,
        title: action.title,
        description: action.description,
        ingredients: action.ingredients,
      });
    case types.DELETE_RECIPE:
      return state.filter(recipe => recipe.id !== action.id);
    case types.UPDATE_RECIPE:
      return state.map(recipe => {
        if (recipe.id !== action.id)
          return recipe;
        return {
          ...recipe,
          title: action.title,
          description: action.description,
          ingredients: action.ingredients,
        };
      });
    default:
      return state;
  }
}

export default recipes;
