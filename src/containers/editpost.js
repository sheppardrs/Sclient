import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddPost from '../components/addpost';
import { updatePost, fetchPost } from '../actions/index';

// this can be a dumb or smart component -
// connect works either way
// const Counter = (props) => {
//   return (
//     <div>
//       Current Count: {props.count}
//     </div>
//   );
// };

class EditAPost extends React.Component {
  componentWillMount() {
    console.log('postID in edit:', this.props.match.params.postID);
    this.props.fetchPost(this.props.match.params.postID);
  }

  render() {
    if (this.props.post.title) {
      return (
        <AddPost
          createPost={this.props.updatePost}
          post={this.props.post}
          history={this.props.history}
        />
      );
    } else {
      return (
        <div>
          loading...
        </div>
      );
    }
  }
}


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
    post: state.post,
  }
);


// react-redux glue -- outputs Container that
// knows state in properties
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { updatePost, fetchPost })(EditAPost));
