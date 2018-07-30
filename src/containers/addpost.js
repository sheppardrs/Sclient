import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddPost from '../components/addpost';
import { createPost } from '../actions/index';


const AddAPost = (props) => {
  const post = {
    title: '', tags: '', content: '', cover_url: '', location: '',
  };
  return (
    <AddPost
      createPost={props.createPost}
      post={post}
      history={props.history}
    />);
};


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

// const mapStateToProps = state => (
//   {
//     post: state.post,
//   }
// );

// react-redux glue -- outputs Container that
// knows state in properties
// new way to connect with react router 4
export default withRouter(connect(null, { createPost })(AddAPost));
