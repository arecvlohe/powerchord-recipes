import React, { Component } from 'react';
import Radium from 'radium';
import color from 'color';
import { Link } from 'react-router';
import Header from './Header';
import RecipesList from './RecipesList';

class Main extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    return (
      <div style={styles.main}>
        <Header />
        <RecipesList />
        <Link
          to='/add'
          style={styles.button}>
          Add Recipe
        </Link>
      </div>
    );
  }
}

Main.contextTypes = {
  store: React.PropTypes.object,
};

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Source Sans Pro',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: 150,
    maxWidth: 250,
    borderRadius: '2.5em',
    padding: '1em 2em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'black',
    border: '1px solid black',
    cursor: 'pointer',
    fontSize: 16,
    ':hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  },
};

export default Main;
