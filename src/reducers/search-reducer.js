import { ActionTypes } from '../actions';

const searchReducer = (state = '', action) => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
