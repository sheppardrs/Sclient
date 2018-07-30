import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { fetchPosts } from '../actions';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    const select = {
      filter: 'none',
      sort: 'newest',
    };
    this.props.fetchPosts(select);
  }

  handleClick(e) {
    const select = {
      filter: 'none',
      sort: e.target.name,
    };
    this.props.fetchPosts(select);
  }

  render() {
    return (
      <div className="sort-buttons">
        Sort By:
        <button onClick={this.handleClick} name="newest">
          Recent
        </button>
        <button onClick={this.handleClick} name="trending">
          Trending
        </button>
        <button onClick={this.handleClick} name="location">
          Location
        </button>
        <button onClick={this.handleClick} name="title">
          Alphabetical
        </button>
      </div>
    );
  }
}

// react-redux glue -- outputs Container that knows how to call actions
// new way to connect with react router 4
export default withRouter(connect(null, { fetchPosts })(Controls));
