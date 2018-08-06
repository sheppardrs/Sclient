import React from 'react';

// handles both singin and  sign up for now since both just require email & Password
// takes props:
// signinUser should be the action creator signinUser
// signupUser -> action creator signupUser
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // change the state based on which input was changed
  handleChange(e) {
    // const field = e.target.name;
    // this.setState({ [field]: e.target.value });
    this.props.search(e.target.value);
    if (!e.target.name) {
      const select = {
        filter: this.props.filterV,
        sort: this.props.sortV,
        search: '',
      };
      this.props.fetchPosts(select);
    }
    e.preventDefault();
  }

  // submit with the local state and reset local state
  handleSubmit(e) {
    const select = {
      filter: this.props.filterV,
      sort: this.props.sortV,
      search: this.props.searchV,
    };
    this.props.fetchPosts(select);
    // reset local state
    e.preventDefault();
  }

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          id="search-input"
          name="term"
          placeholder="What are you looking for?"
          value={this.props.searchV}
          onChange={this.handleChange}
        />
        <button
          className="cancel-button"
          name="clear"
          value=""
          onClick={this.handleChange}
        >
          <i className="fa fa-times" aria-hidden="true" />
        </button>
        <button
          className="search-button"
          name="search"
          onClick={this.handleSubmit}
        >
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </div>
    );
  }
}

export default Search;
