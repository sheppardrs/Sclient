import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// deprecated or moved to other files
// const $ = require('jquery');
// import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
// import $ from 'jquery';

// user made imports
import './style.scss';
import App from './components/app';
import reducers from './reducers';
import { ActionTypes } from './actions';


// For UI Design hardcoded posts
// const post1 = { id: 1, title: 'Sharity', text: 'Give Efficiently, Know Your Impact, Find Your Friend.' };
// const post2 = { id: 2, title: 'Chare-it', text: 'Give Efficiently, Know Your Impact, Find Your Friend.' };
// const post3 = { id: 3, title: 'Give Some', text: 'Give Efficiently, Know Your Impact, Find Your Friend.' };
// const posts = [post1, post2, post3];


const store = createStore(reducers, { sortV: 'newest' }, compose(
  applyMiddleware(thunk, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

store.subscribe(() => console.log('Store Changed:', store.getState()));

// store.dispatch({ type: 'FETCH_POSTS', payload: posts });
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
