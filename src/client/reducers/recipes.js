import * as types from '../constants/ActionTypes';

const initialState = [
  {
    id: 0,
    title: 'Mediterranean Greek Salad',
    description: 'A simple Greek salad recipe',
    ingredients: [
      'Cucumbers',
      'Feta Cheese',
      'Black Olives',
      'Diced Roma Tomatoes',
      'Red Onion',
      'Olive Oil',
      'Red Wine Vinegar',
    ],
  },
  {
    id: 1,
    title: 'Authentic Caesar Dressing',
    description: 'Traditional caesar dressing recipe',
    ingredients: [
      'Anchovies',
      'Garlic',
      'Lemon',
      'Egg Yolk',
      'Dijon Mustard',
      'Worcestershire Sauce',
      'Olive Oil',
      'Parmesan Cheese',
    ],
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
