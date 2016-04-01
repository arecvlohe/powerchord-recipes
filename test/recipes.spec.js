import expect from 'expect';
import recipes from '../src/client/reducers/recipes';

describe('recipes reducer', () => {

  it('should return state when action is undefined', () => {
    const stateBefore = [];
    const action = {
      type: 'not known',
    };
    const stateAfter = [];
    expect(recipes(stateBefore, action)).toEqual(stateAfter);
  });

  it('should return state with new item', () => {
    const stateBefore = [];
    const action = {
      type: 'ADD_RECIPE',
      title: 'title',
      description: 'description',
      ingredients: ['ingredients'],

    };
    const stateAfter = [
      {
        id: 0,
        title: 'title',
        description: 'description',
        ingredients: ['ingredients'],
      },
    ];
    expect(recipes(stateBefore, action)).toEqual(stateAfter);
  });

  it('should return state with item deleted', () => {
    const stateBefore = [
      {
        id: 0,
        title: 'title',
        description: 'description',
        ingredients: ['ingredients'],
      },
    ];
    const action = {
      type: 'DELETE_RECIPE',
      id: 0,
    };
    const stateAfter = [];
    expect(recipes(stateBefore, action)).toEqual(stateAfter);
  });

  it('should return state with item updated', () => {
    const stateBefore = [
      {
        id: 0,
        title: 'title',
        description: 'description',
        ingredients:['ingredients'],
      },
    ];
    const action = {
        type: 'UPDATE_RECIPE',
        id: 0,
        title: 'New Title',
        description: 'New description',
        ingredients: ['new', 'ingredients'],
      };
    const stateAfter = [
      {
        id: 0,
        title: 'New Title',
        description: 'New description',
        ingredients: ['new', 'ingredients'],
      },
    ];
    expect(recipes(stateBefore, action)).toEqual(stateAfter);
  });

});
