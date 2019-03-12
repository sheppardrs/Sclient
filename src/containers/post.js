import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FullPost from '../components/fullpost';
import { fetchPost, deletePost, likePost, startChat } from '../actions/index';

// this is over complicated and should just use mapStatetoProps


class SinglePost extends React.Component {
  componentWillMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  render() {
    if (this.props.post) {
      return (
        <FullPost
          post={this.props.post}
          startChat={this.props.startChat}
          onSelect={this.props.fetchPost}
          onDelete={this.props.deletePost}
          onLike={this.props.likePost}
          history={this.props.history}
        />
      );
    } else {
      return (
        <h1>
          props.posts does not exist!
        </h1>
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
export default withRouter(connect(mapStateToProps, {
  startChat, fetchPost, deletePost, likePost,
})(SinglePost));
