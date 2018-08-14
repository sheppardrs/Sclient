import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signoutUser } from '../actions/index';
// components
import Search from '../containers/search';
import logo from '../img/sharitylogo.png';


function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="logo" style={{ width: 84, height: 28 }} />
    </div>
  );
}

const Nav = (props) => {
  if (props.auth.authenticated) {
    return (
      <nav>
        <Logo />
        <Search />
        <ul className="header">
          <li><NavLink className="navlink" to="/" exact>Home</NavLink></li>
          <li><NavLink className="navlink" to="/posts/new">Add Post</NavLink></li>
          <li><NavLink className="navlink" to="/about">About</NavLink></li>
          <li><NavLink className="navlink" to="/chat">Chat{props.notifications > 0 ? <div id="new-mess-notification">{props.notifications}</div> : <div />}</NavLink></li>
          <li><NavLink id="signout-link" className="navlink" to="/" onClick={(e) => { props.signoutUser(props.history); }}>Sign Out</NavLink></li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <Logo />
        <Search />
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
    notifications: state.notifications,
  }
);


export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
// export default Nav;
