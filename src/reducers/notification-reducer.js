import { ActionTypes } from '../actions';

const notificationReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.NOTIFICATIONS:
      return action.payload;
    case ActionTypes.CLEARNOTIFICATIONS:
      return 0;
    default:
      return state;
  }
};

export default notificationReducer;
