import { combineReducers } from 'redux';
import postsReducer from './posts-reducer';
import postReducer from './post-reducer';
import authReducer from './auth-reducer';
import searchReducer from './search-reducer';
import sortbyReducer from './sortby-reducer';
import filterbyReducer from './filterby-reducer';
import startChatReducer from './startChat-reducer';

const rootReducer = combineReducers({
  all: postsReducer,
  post: postReducer,
  auth: authReducer,
  search: searchReducer,
  sortV: sortbyReducer,
  filterV: filterbyReducer,
  startChat: startChatReducer,
});

export default rootReducer;
