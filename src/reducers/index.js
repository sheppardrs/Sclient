import { combineReducers } from 'redux';
import postsReducer from './posts-reducer';
import postReducer from './post-reducer';
import authReducer from './auth-reducer';
import searchReducer from './search-reducer';
import sortbyReducer from './sortby-reducer';
import filterbyReducer from './filterby-reducer';


const rootReducer = combineReducers({
  all: postsReducer,
  post: postReducer,
  auth: authReducer,
  search: searchReducer,
  sortV: sortbyReducer,
  filterV: filterbyReducer,
});

export default rootReducer;
