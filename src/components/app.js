import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

// UI Components
// import Post from './post';
// import FullPost from './fullpost';
import SinglePost from '../containers/post';
import AddAPost from '../containers/addpost';
import SignInUser from '../containers/signIn';
import SignUp from '../containers/signUp';
import EditAPost from '../containers/editpost';
import Nav from '../components/nav';
import RequireAuth from '../containers/requireAuth';
import Verify from './verify';
import PasswordResetReq from './passwordreq';
import PasswordReset from './password';
import Chat from './chat';
// import About from './account';
import Landing from './landing';
// import Posts from '../containers/posts';
// import Controls from '../containers/controls';
import Welcome from './welcome';
// import AddPost from './addpost';


// For UI Design hardcoded posts
// const post1 = { id: 1, title: 'Sharity', text: 'Give Efficiently, Know Your Impact, Find Your Friend.' };
// const post2 = { id: 2, title: 'Chare-it', text: 'Give Efficiently, Know Your Impact, Find Your Friend.' };
// const post3 = { id: 3, title: 'Give Some', text: 'Give Efficiently, Know Your Impact, Find Your Friend.' };
// const posts = [post1, post2, post3];
//
// const Posts = (props) => {
//   return (
//     props.posts.map((post) => {
//       return (
//         <Post
//           key={post.id}
//           post={post}
//         />
//       );
//     })
//
//   );
// };


// const Welcome = (props) => {
//   return (
//     <div className="posts-page">
//       <div className="posts-filters-box">
//         <Controls />
//         <Posts />
//         {/* <Posts posts={posts} /> */}
//       </div>
//     </div>
//   );
// };

const PostSignUp = (props) => {
  return (
    <div className="full-post">
      <h1>Sign Up succeeded.</h1>
      Check your email for a verification email that is the last step before posting!
      <br /><NavLink className="navlink" to="/">Visit the homepage to begin sharing.</NavLink>
    </div>
  );
};


const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/landing" component={Landing} />
          <Route exact path="/" component={Welcome} />
          <Route exact path="/posts" component={Welcome} />
          <Route path="/signin" component={SignInUser} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signupsuccess" component={PostSignUp} />
          <Route path="/posts/new" component={RequireAuth(AddAPost)} />
          <Route path="/about" component={Landing} />
          <Route exact path="/posts/:postID" component={SinglePost} />
          <Route exact path="/posts/:postID/edit" component={RequireAuth(EditAPost)} />
          <Route path="/verify" component={Verify} />
          <Route path="/resetpasswordreq" component={PasswordResetReq} />
          <Route exact path="/passwordreset/*" component={PasswordReset} />
          <Route path="/chat" component={RequireAuth(Chat)} />
          {/* <Route exact
            path="/posts/:postID"
            render={props => (
              <FullPost post={post1} {...props} />
          )}
        /> */}
          <Route render={() => (<div>Page not found.</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
