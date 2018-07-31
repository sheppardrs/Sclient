// import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignUp from '../components/signUp';
import { signupUser } from '../actions/index';

// react-redux glue -- outputs Container that
// knows state in properties
// new way to connect with react router 4
export default withRouter(connect(null, { signupUser })(SignUp));
