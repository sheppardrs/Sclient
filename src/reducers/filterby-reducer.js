import { ActionTypes } from '../actions';

// could start by doing the offers/requests, but will leave that filter client side for now
const filterbyReducer = (state = 'offers', action) => {
  switch (action.type) {
    case ActionTypes.FILTERV:
      return action.payload;
    default:
      return state;
  }
};

export default filterbyReducer;
