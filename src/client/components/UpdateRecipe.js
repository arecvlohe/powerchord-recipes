import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header';

class UpdateRecipe extends Component {

  componentWillMount() {
    const { recipes } = this.context.store.getState();
    const recipe = recipes.filter(recipe => recipe.id == this.props.params.id)[0];
    this.setState({ ingredients: recipe.ingredients });
  }

  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    };
  }

  render() {
    const { recipes } = this.context.store.getState();
    const recipe = recipes.filter(recipe => recipe.id == this.props.params.id)[0];
    const ingredients = ['Flour', 'Eggs', 'Grits', 'Bacon', 'Syrup', 'Hashbrowns'];
    const selected = this.state.ingredients;
    return (
      <div style={styles.main}>
        <Header />
        <input
          style={styles.input}
          type='text'
          placeholder={recipe.title}
          ref='title' />
        <input
          style={styles.input}
          type='text'
          placeholder={recipe.description}
          ref='description'/>
        <select
          multiple={true}
          value={[]}
          style={styles.select}>
          {ingredients.map((ingredient, index) =>
            <option
              key={index}
              onClick={(e) => this.handleAddIngredient(e)}
              value={ingredient}>
              {ingredient}
            </option>
          )}
        </select>
        <div style={styles.ingredients}>
          {selected.map((item, index) =>
            <div
              key={index}
              style={styles.item}
              onClick={(e) => this.handleDeleteIngredient(e) }>
              {item}
            </div>
          )}
        </div>
        <Link
          to='/'
          style={styles.button}
          onClick={() =>  this.handleUpdateRecipe()}>
          Update
        </Link>
        <Link
          style={styles.btnBack}
          to='/'>
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

  handleDeleteIngredient(e) {
    const value = e.target.innerHTML;
    const newArr = this.state.ingredients.slice();
    const filtered = newArr.filter(item => item !== value);
    this.setState({ ingredients: filtered });
  }

  handleUpdateRecipe() {
    const { recipes } = this.context.store.getState();
    const recipe = recipes.filter(recipe => recipe.id == this.props.params.id)[0];
    this.context.store.dispatch({
      type: 'UPDATE_RECIPE',
      id: Number(this.props.params.id),
      title: this.refs.title.value || recipe.title,
      description: this.refs.description.value || recipe.description,
      ingredients: this.state.ingredients,
    });
    const fields = ['title', 'description'];
    fields.forEach(field => {
      this.refs[field].value = '';
    });
    this.setState({ ingredients: [] });
  }
}

UpdateRecipe.contextTypes = {
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

export default UpdateRecipe;
