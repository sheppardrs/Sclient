// import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import Post from '../components/post';
import Posts from '../components/posts';
import { fetchPost, deletePost, likePost } from '../actions/index';

// this can be a dumb or smart component -
// connect works either way
// const Counter = (props) => {
//   return (
//     <div>
//       Current Count: {props.count}
//     </div>
//   );
// };

// class Posts extends React.Component {
//   render() {
//     if (this.props.posts) {
//       return (
//         this.props.posts.map((post) => {
//           return (
//             <Post
//               key={post.id}
//               post={post}
//               onSelect={this.props.fetchPost}
//               onDelete={this.props.deletePost}
//               onLike={this.props.likePost}
//               history={this.props.history}
//             />
//           );
//         })
//
//       );
//     } else {
//       return (<h1>props.posts does not exist!</h1>);
//     }
//   }
// }


// connects particular parts of redux state
// to this component's props
// const mapStateToProps = (state) => {
//   console.log('mapping some state to some props rn please let me fail in peace.');
//   console.log(`state: ${state} \n
//               state[0]: ${state[0]}\n
//               state[1]: ${state[1]}`);
//   console.log(`state.all: ${state.all}`);
//   console.log(`state.all[0].title ${state.all[0].title}`);
//   return ({
//     posts: state.all,
//   });
// };

const mapStateToProps = state => (
  {
    posts: state.all,
  }
);

// react-redux glue -- outputs Container that
// knows state in properties
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { fetchPost, deletePost, likePost })(Posts));
