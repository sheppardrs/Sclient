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
      <NavLink className="navlink" to="/" exact>
        <img src={logo} alt="logo" style={{ width: 84, height: 28 }} />
      </NavLink>
    </div>
  );
}

// const Nav = (props) => {
class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      showMobile: false,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const isMobile = this.state.width <= 500;
    let links, linkbar;

    // set the links based on whether it is authenticated or not
    if (this.props.auth.authenticated) {
      links = (
        <ul className="header">
          <li><NavLink className="navlink" to="/" exact>Home</NavLink></li>
          <li><NavLink className="navlink" to="/posts/new">Add Post</NavLink></li>
          <li><NavLink className="navlink" to="/about">About</NavLink></li>
          <li><NavLink className="navlink" to="/chat">Chat{this.props.notifications > 0 ? <div id="new-mess-notification">{this.props.notifications}</div> : <div />}</NavLink></li>
          <li><NavLink id="signout-link" className="navlink" to="/" onClick={(e) => { this.props.signoutUser(this.props.history); }}>Sign Out</NavLink></li>
        </ul>
      );
    } else {
      links = (
        <ul className="header">
          <li><NavLink className="navlink" to="/" exact>Home</NavLink></li>
          <li><NavLink className="navlink" to="/posts/new">Add Post</NavLink></li>
          <li><NavLink className="navlink" to="/about">About</NavLink></li>
          <li><NavLink className="navlink" to="/signin">Sign In</NavLink></li>
          <li><NavLink className="navlink" to="/signup">Sign Up</NavLink></li>
        </ul>
      );
    }

    // if it is mobile don't show links until button clicked
    if (isMobile) {
      linkbar = (
        <div>
          <nav>
            <Logo />
            <button className="save-button-white" onClick={() => this.setState(prevState => ({ showMobile: !prevState.showMobile }))}>
            Menu
            </button>
          </nav>
          <div className="mobile-nav">
            {this.state.showMobile ? links : ''}
          </div>
        </div>
      );
    } else {
      linkbar = (<nav> <Logo /> <Search /> {links}</nav>);
    }
    return (linkbar);

    // if (this.props.auth.authenticated) {
    //   return (
    //     <nav>
    //       <Logo />
    //       <Search />
    //       <ul className="header">
    //         <li><NavLink className="navlink" to="/" exact>Home</NavLink></li>
    //         <li><NavLink className="navlink" to="/posts/new">Add Post</NavLink></li>
    //         <li><NavLink className="navlink" to="/about">About</NavLink></li>
    //         <li><NavLink className="navlink" to="/chat">Chat{props.notifications > 0 ? <div id="new-mess-notification">{props.notifications}</div> : <div />}</NavLink></li>
    //         <li><NavLink id="signout-link" className="navlink" to="/" onClick={(e) => { props.signoutUser(props.history); }}>Sign Out</NavLink></li>
    //       </ul>
    //     </nav>
    //   );
    // } else {
    //   return (
    //     <nav>
    //       <Logo />
    //       <Search />
    //       <ul className="header">
    //         <li><NavLink className="navlink" to="/" exact>Home</NavLink></li>
    //         <li><NavLink className="navlink" to="/posts/new">Add Post</NavLink></li>
    //         <li><NavLink className="navlink" to="/about">About</NavLink></li>
    //         <li><NavLink className="navlink" to="/signin">Sign In</NavLink></li>
    //         <li><NavLink className="navlink" to="/signup">Sign Up</NavLink></li>
    //       </ul>
    //     </nav>
    //   );
    // }
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
    notifications: state.notifications,
  }
);


export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
// export default Nav;
