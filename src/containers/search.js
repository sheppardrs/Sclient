// import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Search from '../components/search';
import { fetchPosts, search } from '../actions/index';


const mapStateToProps = state => (
  {
    term: state.search,
    filter: state.filter,
    sortby: state.sortby,
  }
);
// react-redux glue -- outputs Container that
// knows state in properties
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { fetchPosts, search })(Search));
