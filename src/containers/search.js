// import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignIn from '../components/signIn';
import { signinUser } from '../actions/index';


// react-redux glue -- outputs Container that
// knows state in properties
// new way to connect with react router 4
export default withRouter(connect(null, { signinUser })(SignIn));
