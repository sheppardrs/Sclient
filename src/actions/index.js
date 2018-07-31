import axios from 'axios';

// keys for actiontypes
// for the blog lab4
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  // will add these as we go
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  // DELETE_POST: 'DELETE_POST',
  // old from starter
  // INCREMENT: 'INCREMENT',
  // DECREMENT: 'DECREMENT',
};


// Some constants for interfacing with the API
// For herokuapp given:
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
// For my server
const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '';
// const API_KEY = '?key=r_blake';


// get all the posts
export function fetchPosts(select) {
  // axios get
  return (dispatch) => {
    // get is old, patch is for filtering
    // axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
    axios.patch(`${ROOT_URL}/posts${API_KEY}`, select).then((response) => {
      const posts = response.data;
      // console.log('posts is: ', posts);
      dispatch({
        type: 'FETCH_POSTS',
        payload: posts,
      });
    }).catch((error) => {
      // hit an error -> do something else
      console.log('FAILED IN ACTION fetchPosts');
    });
  };
}

// create a new post on the server
export function createPost(post, history) {
  // axios post here
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post, {
      headers: { authorization: localStorage.getItem('token') },
    }).then((response) => {
      // do something with the response.data (some json)
      // console.log('posts is: ', posts);
      const newpost = response.data;
      console.log('This is the response of the post', newpost);
      history.push(`/posts/${newpost._id}`);
      dispatch({
        type: 'FETCH_POST',
        payload: newpost,
      });
    }).catch((error) => {
      // hit an error -> do something else
      console.log('FAILED IN ACTION createPost');
    });
  };
}

// update the post
export function updatePost(post, history) {
  // axios put
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, post, {
      headers: { authorization: localStorage.getItem('token') },
    }).then((response) => {
      // do something with the response.data (some json)
      // console.log('posts is: ', posts);
      const newpost = response.data;
      // console.log('This is the response of the post', newpost);
      history.push(`/posts/${newpost._id}`);
      dispatch({
        type: 'FETCH_POST',
        payload: newpost,
      });
    }).catch((error) => {
      // hit an error -> do something else
      console.log('FAILED IN ACTION createPost');
    });
  };
}
// get a single post
export function fetchPost(id) {
  // axios get
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      // do something with the response.data (some json)
      // console.log('Single  Post:', response.data);
      const post = response.data;
      // console.log('posts is: ', posts);
      dispatch({
        type: 'FETCH_POST',
        payload: post,
      });
    }).catch((error) => {
      // hit an error -> do something else
      console.log('FAILED IN ACTION fetchPost');
    });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      history.push('/');
      dispatch(fetchPosts());
    }).catch((error) => {
      // hit an error -> do something else
      console.log('FAILED IN ACTION deletePost');
    });
  };
}

export function likePost(id, history) {
  return (dispatch) => {
    console.log('history', history.location.pathname);
    axios.patch(`${ROOT_URL}/posts/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      // history.push('/');
      if (history.location.pathname === '/') {
        dispatch(fetchPosts());
      } else {
        dispatch(fetchPost(id));
      }
    }).catch((error) => {
      // hit an error -> do something else
      console.log('FAILED IN ACTION likePost');
    });
  };
}
// Action creators for signing in/out/up

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

// signin user using thunk to post to signin route with email and password
// store token on success and dispatch AUTH_USER action
export function signinUser({ email, password }, history) {
  // from createPost
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin${API_KEY}`, { email, password }).then((response) => {
      // do something with the response.data (some json)
      // console.log('posts is: ', posts);
      localStorage.setItem('token', response.data.token);
      if (response.data.username) {
        localStorage.setItem('username', response.data.username);
      }
      dispatch({ type: ActionTypes.AUTH_USER });
      history.push('/');
    }).catch((error) => {
      // hit an error -> do something else
      dispatch(authError(`Signin failed: ${error.response.data}`));
      console.log('FAILED in ACTION: signin failed');
      // alert('signin failed. Please try again or sign up.');
    });
  };
}

// Same as signin but using signup route
export function signupUser({ email, password, username }, history) {
  // from createPost
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username }).then((response) => {
      // do something with the response.data (some json)
      localStorage.setItem('token', response.data.token);
      history.push('/');
      dispatch({ type: ActionTypes.AUTH_USER });
    }).catch((error) => {
      // hit an error -> do something else
      dispatch(authError(`Signin failed: ${error.response.data}`));
      console.log('FAILED IN ACTION signupUser');
    });
  };
}

// deletes token from localstorage
// and dispatches deauth action
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}


// export function increment() {
//   return {
//     type: ActionTypes.INCREMENT,
//     payload: null,
//   };
// }
//
// export function decrement() {
//   return {
//     type: ActionTypes.DECREMENT,
//     payload: null,
//   };
// }
