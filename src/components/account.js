import React from 'react';
import { NavLink } from 'react-router-dom';

const About = (props) => {
  return (
    <div className="full-post">
      <h1>Account</h1>
      <NavLink to="/resetpasswordreq">Reset password.</NavLink>
      <NavLink to="/verify">Verify your account.</NavLink>
    </div>
  );
};

export default About;
