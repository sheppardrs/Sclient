import { ActionTypes } from '../actions';


// For UI Design hardcoded posts
// const post1 = { id: 1, title: 'Sharity', text: 'Give Efficiently, Know Your Impact, Find Your Friend.' };


const startChatReducer = (state = { startChat: null }, action) => {
  switch (action.type) {
    case ActionTypes.STARTCHAT:
      return action.payload;
    case ActionTypes.CLEARCHAT:
      return null;
    default:
      return state;
  }
};

export default startChatReducer;
