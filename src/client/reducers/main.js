import { combineReducers } from 'redux';
import recipes from './recipes';

const reducer = combineReducers({
  recipes,
});

export default reducer;
