import { ActionTypes } from '../actions';


// For UI Design hardcoded posts
// const post1 = { id: 1, title: 'Sharity', text: 'Give Efficiently, Know Your Impact, Find Your Friend.' };


const startChatReducer = (state = { startChat: null }, action) => {
  switch (action.type) {
    case ActionTypes.SOCKET:
      return { startChat: action.payload };
    // case ActionTypes.:
    //   return { authenticated: false };
    default:
      return state;
  }
};

export default startChatReducer;
