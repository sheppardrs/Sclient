import React from 'react';
// import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import marked from 'marked';
import { NavLink } from 'react-router-dom';


// hard coded post for UI design
class FullPost extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.startConvo = this.startConvo.bind(this);
  }

  startConvo(e) {
    console.log('the author you are contacting is', this.props.post.author.username);
    if (this.props.startChat) {
      this.props.startChat(this.props.post.author.username, this.props.history);
    }
    e.preventDefault();
  }

  handleDelete(e) {
    // console.log(`Delete ${this.props.post.title}`);
    this.props.onDelete(this.props.post._id, this.props.history);
  }

  handleLike(e) {
    this.props.onLike(this.props.post._id, this.props.history);
    // console.log(`Like ${this.props.post.title}`);
  }

  render() {
    let editbutton;
    if (this.props.post.author) {
      if (this.props.post.author.username === localStorage.username) {
        editbutton = (
          <div className="post-buttons">
            <i
              onClick={this.handleDelete}
              tabIndex={-1}
              className="fas fa-trash"
              role="button"
            />
            <NavLink
              className="full-post-button-link"
              to={`/posts/${this.props.post.id}/edit`}
              exact
              role="button"
              tabIndex={-1}
            >
              <i
                onClick={this.handleEdit}
                tabIndex={-1}
                className="fas fa-edit"
                role="button"
              />
            </NavLink>
            <i
              onClick={this.handleLike}
              tabIndex={-1}
              className="fas fa-arrow-up"
              role="button"
            >
              {' '}
              {this.props.post.likes}
            </i>
          </div>
        );
      } else {
        editbutton = (
          <div className="post-buttons">
            <i
              onClick={this.handleLike}
              tabIndex={-1}
              className="fas fa-arrow-up"
              role="button"
            >
              {' '}
              {this.props.post.likes}
            </i>
            <i
              onClick={this.startConvo}
              tabIndex={-1}
              className="fas fa-comments"
              role="button"
            />
          </div>
        );
      }
    } else {
      editbutton = (
        <div>
loading...
        </div>
      );
    }
    return (
      <div>
        <i
          id="back-button"
          onClick={() => this.props.history.goBack()}
          tabIndex={-1}
          className="fas fa-arrow-left"
          role="button"
        />
        <div className="full-post">
          <div className="full-post-header">
            <img src={this.props.post.cover_url} alt="cover for post" />
            <h4 id="title-input">
              {this.props.post.title}
            </h4>
            <div>
              {editbutton}
              {/* old buttons <i
              onClick={this.handleDelete}
              tabIndex={-1}
              className="fas fa-trash"
              role="button"
            />
            <NavLink
              className="full-post-button-link"
              to={`/posts/${this.props.post.id}/edit`}
              exact
              role="button"
              tabIndex={-1}
            >
              <i
                onClick={this.handleEdit}
                tabIndex={-1}
                className="fas fa-edit"
                role="button"
              />
            </NavLink>
            <i
              onClick={this.handleLike}
              tabIndex={-1}
              className="fas fa-heart"
              role="button"
            > {this.props.post.likes}
          </i> */}
            </div>
          </div>
          {/* <p>{this.props.post.text}</p> */}
          <div
            className="full-post-body"
            dangerouslySetInnerHTML={{
              __html: marked(this.props.post.content || ''),
            }}
          />
          <div
            className="full-post-author"
          >
          username:
            { this.props.post.author ? ` ${this.props.post.author.username}` : 'loading' }
          </div>
        </div>
      </div>
    );
  }
}

export default FullPost;
