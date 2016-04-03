import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/main';
import Main from './components/Main';
import AddRecipe from './components/AddRecipe';
import UpdateRecipe from './components/UpdateRecipe';

const store = createStore(reducer);
const rootEl = document.getElementById('root');

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Main} />
      <Route path='/add' component={AddRecipe} />
      <Route path='/edit' component={UpdateRecipe} >
        <Route path=':id' component={UpdateRecipe}/>
      </Route>
    </Router>
  </Provider>), rootEl);
