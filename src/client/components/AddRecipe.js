import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header';
import Ingredient from './Ingredient';

class AddRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    };
  }

  render() {
    const ingredients = ['Flour', 'Eggs', 'Butter', 'Blueberries'];
    const  selected = this.state.ingredients;
    return (
      <div style={styles.main}>
        <Header />
        <input
          style={styles.input}
          type='text'
          placeholder='Title'
          ref='title'/>
        <input
          style={styles.input}
          type='text'
          placeholder='Description'
          ref='description'/>
        <select
          value={'prompt'}
          style={styles.select}
          onChange={(e) => this.handleAddIngredient(e)}>
          <option value='prompt' disabled>-- Select Ingredient --</option>
          {ingredients.map((ingredient, index) =>
            <option
              key={index}
              value={ingredient}>
              {ingredient}
            </option>
          )}
        </select>
        <div style={styles.ingredients}>
          {selected.map((ingredient, index) =>
            <Ingredient
              key={index}
              index={index}
              ingredient={ingredient}
              onDeleteClick={index => this.handleDeleteIngredient(index) }/>
          )}
        </div>
        <Link
          to='/'
          style={styles.button}
          onClick={() =>  this.handleAddRecipe()}>
          Save
        </Link>
        <Link
          to='/'
          style={styles.btnBack}>
          Back
        </Link>
      </div>
    );
  }

  handleAddIngredient(e) {
    const value = e.target.value;
    const newArr = this.state.ingredients.slice() || [];
    newArr.push(value);
    this.setState({ ingredients: newArr });
  }

  handleDeleteIngredient(index) {
    const newArr = this.state.ingredients.slice();
    const filtered = newArr.filter((_, idx) => idx !== index);
    this.setState({ ingredients: filtered });
  }

  handleAddRecipe() {
    this.context.store.dispatch({
      type: 'ADD_RECIPE',
      title: this.refs.title.value,
      description: this.refs.description.value,
      ingredients: this.state.ingredients,
    });
    const fields = ['title', 'description'];
    fields.forEach(field => {
      this.refs[field].value = '';
    });
    this.setState({ ingredients: [] });
  }
}

AddRecipe.contextTypes = {
  store: React.PropTypes.object,
};

const styles = {
  main: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 600,
    margin: '0 auto',
  },
  input: {
    minWidth: 600,
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
    border: 'none',
    borderBottom: 'solid 1px black',
    paddingBottom: 2,
    paddingTop: 10,
    marginBottom: 10,
  },
  select: {
    alignSelf: 'flex-start',
    cursor: 'pointer',
    marginTop: 20,
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
  },
  ingredients: {
    padding: '20px 0',
    alignSelf: 'flex-start',
    fontFamily: 'Source Sans Pro',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'flex-start',
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
    fontFamily: 'Source Sans Pro',
  },
  btnItem: {
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: 16,
  },
  btnBack: {
    alignSelf: 'flex-start',
    marginTop: 20,
    textDecoration: 'none',
    color: 'black',
    textTransform: 'uppercase',
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
    outline: 'none',
  },
};

export default AddRecipe;
