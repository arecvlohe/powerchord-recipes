import React, { Component } from 'react';
import { Link } from 'react-router';
import ContentEditable from 'react-contenteditable';
import Header from './Header';
import Ingredient from './Ingredient';

class UpdateRecipe extends Component {

  componentWillMount() {
    const { recipes } = this.context.store.getState();
    const recipe = recipes.filter(recipe => recipe.id == this.props.params.id)[0];
    this.setState({
      title: `<div>${recipe.title}</div>`,
      description: `<div>${recipe.description}</div>`,
      ingredients: recipe.ingredients,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      ingredients: [],
    };
  }

  render() {
    const { recipes } = this.context.store.getState();
    const recipe = recipes.filter(recipe => recipe.id == this.props.params.id)[0];
    const ingredients = ['Flour', 'Eggs', 'Butter', 'Blueberries'];
    const selected = this.state.ingredients;
    return (
      <div style={styles.main}>
        <Header />
        <ContentEditable
          html={this.state.title}
          style={styles.contentEditable}
          disabled={false}
          onChange={e => this.handleUpdateTitle(e)}/>
        <ContentEditable
          html={this.state.description}
          style={styles.contentEditable}
          disabled={false}
          onChange={e => this.handleUpdateDescription(e)}/>
        <select
          value={''}
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
          {selected.map((ingredient, index) =>
            <Ingredient
              key={index}
              index={index}
              onDeleteClick={index => this.handleDeleteIngredient(index)}
              ingredient={ingredient}/>
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

  handleUpdateTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleUpdateDescription(e) {
    this.setState({ description: e.target.value });
  }

  handleAddIngredient(e) {
    const value = e.target.value;
    const newArr = this.state.ingredients.slice() || [];
    newArr.push(value);
    this.setState({ ingredients: newArr });
  }

  handleDeleteIngredient(index) {
    const newArr = this.state.ingredients.slice();
    const filtered = newArr.filter((itm, idx) => idx != index);
    this.setState({ ingredients: filtered });
  }

  handleUpdateRecipe() {
    const title = this.state.title.replace(/<\/?div>/g, '');
    const description = this.state.description.replace(/<\/?div>/g, '');
    this.context.store.dispatch({
      type: 'UPDATE_RECIPE',
      id: Number(this.props.params.id),
      title: title,
      description: description,
      ingredients: this.state.ingredients,
    });
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
  contentEditable: {
    minWidth: 600,
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
    border: 'none',
    borderBottom: 'solid 1px black',
    paddingBottom: 2,
    paddingTop: 10,
    marginBottom: 10,
    outline: 0,
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
