import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from '../containers/posts';
import Controls from '../containers/controls';

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
import Search from '../containers/search';
// import AddPost from './addpost';


const About = (props) => {
  return <div>All there is to know about me</div>;
};


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


const Welcome = (props) => {
  return (
    <div className="posts-page">
      <Search />
      <div className="posts-filters-box">
        <Controls />
        <Posts />
        {/* <Posts posts={posts} /> */}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/signin" component={SignInUser} />
          <Route path="/signup" component={SignUp} />
          <Route path="/posts/new" component={RequireAuth(AddAPost)} />
          <Route path="/about" component={About} />
          <Route exact path="/posts/:postID" component={SinglePost} />
          <Route exact path="/posts/:postID/edit" component={RequireAuth(EditAPost)} />
          {/* <Route exact
            path="/posts/:postID"
            render={props => (
              <FullPost post={post1} {...props} />
          )}
        /> */}
          <Route render={() => (<div>Post not found.</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
