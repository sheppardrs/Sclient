import React from 'react';

class AddPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: '',
      content: '',
      location: '',
      cover_url: '',
      id: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  // set the values, works for edit and create
  componentWillMount() {
    // console.log('HERE is what we got for post', this.props.post);
    if (this.props.post) {
      this.setState({
        title: this.props.post.title,
        tags: this.props.post.tags,
        content: this.props.post.content,
        location: this.props.post.location,
        cover_url: this.props.post.cover_url,
      });
    }
    if (this.props.post._id) {
      this.setState({ id: this.props.post._id });
    }
  }
  // change the state based on which input was changed
  handleChange(e) {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
  }

  // submit with the local state and reset local state
  handleSubmit(e) {
    console.log('You submitted.', e.target.name, 'request', e.target.name === 'request');
    const post = {
      title: this.state.title,
      tags: this.state.tags,
      cover_url: this.state.cover_url,
      content: this.state.content,
      location: this.state.location,
      request: (e.target.name === 'request'),
      id: this.state.id,
    };
    this.props.createPost(post, this.props.history);
    // reset local state
    this.setState({
      title: '',
      tags: '',
      content: '',
      location: '',
      cover_url: '',
    });
    e.preventDefault();
  }

  render() {
    return (
      <div className="add-post">
        <form onSubmit={this.handleSubmit} className="add-note-form">
          <textarea
            type="text"
            id="title-input"
            name="title"
            placeholder="Tight Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <textarea
            type="text"
            id="location-input"
            name="location"
            placeholder="Loco Location"
            value={this.state.location}
            onChange={this.handleChange}
          />
          <div id="tag-cover_url-container">
            <textarea
              type="text"
              id="tag-input"
              name="tags"
              placeholder="Tenatious Tags"
              value={this.state.tags}
              onChange={this.handleChange}
            />
            <textarea
              type="text"
              id="cover_url-input"
              name="cover_url"
              placeholder="Copied Covers"
              value={this.state.cover_url}
              onChange={this.handleChange}
            />
          </div>
          <textarea
            type="text"
            id="content-input"
            name="content"
            placeholder="Contentious Content"
            value={this.state.content}
            onChange={this.handleChange}
          />
          {/* <button
            className="save-button"
            onClick={this.handleSubmit}
            type="submit"
            value="Submit"
          /> */}
          <button
            className="save-button"
            name="offer"
            type="submit"
            value="Offer"
            onClick={this.handleSubmit}
          >
            Offer
          </button>
          <button
            className="save-button"
            name="request"
            type="submit"
            value="Request"
            onClick={this.handleSubmit}
          >
            Request
          </button>
        </form>
      </div>
    );
  }
}

export default AddPost;
