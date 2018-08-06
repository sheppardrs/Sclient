import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { fetchPosts, sortby, filterby } from '../actions';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // this.state = {
    //   sort: 'newest',
    // };
  }
  componentWillMount() {
    // const select = {
    //   filter: 'none',
    //   sort: 'newest',
    // };
    // this.props.fetchPosts(select);
    // new with redux state
    const select = {
      filter: this.props.filterby,
      sort: this.props.sortV,
      search: this.props.search,
    };
    this.props.fetchPosts(select);
  }

  handleClick(e) {
    // const select = {
    //   filter: 'none',
    //   sort: e.target.name,
    // };
    // this.props.fetchPosts(select);
    // this.setState({ sort: e.target.name });
    // with redux state
    this.props.sortby(e.target.name);
    const select = {
      filter: this.props.filterby,
      sort: e.target.name,
      search: this.props.search,
    };
    this.props.fetchPosts(select);
  }

  render() {
    console.log('this.props.sortV', this.props.sortV);
    return (
      <div className="sort-buttons">
        <div>Sort By</div>
        <button
          onClick={this.handleClick}
          id={(this.props.sortV === 'newest') ? 'sort-selected' : ''}
          name="newest"
        >
          Recent
        </button>
        <button
          onClick={this.handleClick}
          id={(this.props.sortV === 'trending') ? 'sort-selected' : ''}
          name="trending"
        >
          Trending
        </button>
        <button
          onClick={this.handleClick}
          id={(this.props.sortV === 'location') ? 'sort-selected' : ''}
          name="location"
        >
          Location
        </button>
        <button
          onClick={this.handleClick}
          id={(this.props.sortV === 'title') ? 'sort-selected' : ''}
          name="title"
        >
          Alphabetical
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    sortV: state.sortV,
    filterV: state.filterV,
    search: state.search,
  }
);
// react-redux glue -- outputs Container that knows how to call actions
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { fetchPosts, sortby, filterby })(Controls));
