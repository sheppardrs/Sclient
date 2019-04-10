import React from 'react';
import { NavLink } from 'react-router-dom';

const About = (props) => {
  return (
    <div className="landing-footer">
      <div className="landing-content">
        <h1>
          Account Help
        </h1>
        <div className="button-box">
          <button type="button" className="save-button-white">
            <NavLink className="navlink" to="/resetpasswordreq">
              Reset password
            </NavLink>
          </button>
          <br />
          <br />
          <button type="button" className="save-button-white">
            <NavLink className="navlink" to="/verify">
              Verify your account
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
