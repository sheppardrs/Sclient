import { ActionTypes } from '../actions';

const sortbyReducer = (state = 'newest', action) => {
  switch (action.type) {
    case ActionTypes.SORTV:
      return action.payload;
    default:
      return state;
  }
};

export default sortbyReducer;
