import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { signoutUser } from '../actions/index';


function Logo() {
  return (
    <div className="logo">
      <i id="logo_bird" className="fas fa-hand-holding-heart" />
      <div className="logo-text">
        <p className="logo-life">Sharity</p>
        <p className="logo-slogan">Give More</p>
      </div>
    </div>
  );
}

const Nav = (props) => {
  if (props.auth.authenticated) {
    return (
      <nav>
        <Logo />
        <ul className="header">
          <li><NavLink className="navlink" to="/" exact>Home</NavLink></li>
          <li><NavLink className="navlink" to="/posts/new">Add Post</NavLink></li>
          <li><NavLink className="navlink" to="/about">About</NavLink></li>
          <li><button className="signout-button" onClick={(e) => { props.signoutUser(props.history); }}>Sign Out</button></li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <Logo />
        <ul className="header">
          <li><NavLink className="navlink" to="/" exact>Home</NavLink></li>
          <li><NavLink className="navlink" to="/posts/new">Add Post</NavLink></li>
          <li><NavLink className="navlink" to="/about">About</NavLink></li>
          <li><NavLink className="navlink" to="/signin">Sign In</NavLink></li>
          <li><NavLink className="navlink" to="/signup">Sign Up</NavLink></li>
        </ul>
      </nav>
    );
  }
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);


export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
// export default Nav;
