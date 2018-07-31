import React from 'react';
import Post from '../components/post';


// this can be a dumb or smart component -
// connect works either way
// const Counter = (props) => {
//   return (
//     <div>
//       Current Count: {props.count}
//     </div>
//   );
// };

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: false,
    };

    this.toggleReqOffer = this.toggleReqOffer.bind(this);
  }

  toggleReqOffer(e) {
    if (e.target.name === 'Offer') {
      this.setState({ request: false });
    } else {
      this.setState({ request: true });
    }
  }

  render() {
    if (this.props.posts) {
      return (
        <div className="posts">
          {this.state.request ?
            <div className="toggle-req-offer">
              <i
                className="toggle-selected"
                id="toggle-req-offer-request"
                // style={{ fontWeight: 'bold' }}
              >
                Requests
              </i>
              <button
                // className="toggle-unselected"
                onClick={this.toggleReqOffer}
                name="Offer"
              >
              Offers
              </button>
            </div>
            :
            <div className="toggle-req-offer">
              <button
                // className="toggle-unselected"
                id="toggle-req-offer-request"
                onClick={this.toggleReqOffer}
                name="Request"
              >
              Requests
              </button>
              <i
                className="toggle-selected"
                // style={{ fontWeight: 'bold' }}
              >
                Offers
              </i>
            </div>
            }
          {this.props.posts.map((post) => {
            // console.log(this.state.request, post.request);
            if (this.state.request === post.request) {
              return (
                <Post
                  key={post.id}
                  post={post}
                  onSelect={this.props.fetchPost}
                  onDelete={this.props.deletePost}
                  onLike={this.props.likePost}
                  history={this.props.history}
                />
              );
            } else {
              return <div key={post.id} />;
            }
        })}
        </div>
      );
    } else {
      return (<h1>props.posts does not exist!</h1>);
    }
  }
}

export default Posts;
