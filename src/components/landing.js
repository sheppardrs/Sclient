import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import logo from '../img/sharitylogo.png';
import process1 from '../img/process-07.png';
import process2 from '../img/process-08.png';
import process3 from '../img/process-09.png';
import About from './account';

const Landing = (props) => {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     width: window.innerWidth,
  //   };
  // }
  //
  // componentWillMount() {
  //   window.addEventListener('resize', this.handleWindowSizeChange);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleWindowSizeChange);
  // }
  //
  // handleWindowSizeChange = () => {
  //   this.setState({ width: window.innerWidth });
  // }
  let footer, signInUp;
  // if signed in hide signup and show account settings
  if (props.auth.authenticated) {
    footer = <About />;
    signInUp = <div />;
  } else { // else show sign ups
    footer = (
      <div className="landing-footer">
        <div className="landing-content">
          <h1>
All
            {' that\'s'}
            {' '}
missing is you
          </h1>
          <div className="button-box">
            <button type="button" className="save-button-white">
              <NavLink className="navlink" to="/signup">
Sign Up
              </NavLink>
            </button>
          </div>
          <p className="slogan">
          Contact us with any feedback, questions, comments: sharitygive@gmail.com
          </p>
        </div>
      </div>
    );
    signInUp = (
      <button type="button" className="save-button-white">
        <NavLink className="navlink" to="/signup">
Sign Up
        </NavLink>
      </button>
    );
  }

  return (
    <div className="landing">
      <div className="landing-title">
        <div className="landing-padding" />
        <div className="logo-box">
          <img src={logo} alt="logo" />
        </div>
        <div className="slogan-box">
          <p className="slogan">
Building community through shared items and stories
          </p>
        </div>
        <div className="landing-padding" />
        <div className="button-box">
          {/* <button className="save-button-white"><NavLink className="navlink" to="/signup">Sign Up</NavLink></button> */}
          {signInUp}
        </div>
        <div className="landing-padding-large" />
      </div>
      <div className="landing-section-mission">
        <div className="landing-content">
          <h1>
            Inspiration
          </h1>
          <p>
         Nowadays we have so many opportunities to give to causes. However, there is little, if any, connection between the giver
         and the receiver, and this lack of communication results in many donations that are not properly distributed to those who
         need it most and a lack of human connection around the need and impact of an item.
            <br />
            <br />
         Sharity is a non-profit that reimagines donating and receiving by building human connections around finding items a more
         useful home. To do this you can tell your story, the story of what could help you, or the story of what you have to give
         in order to connect with someone who can help you either give or receive.
            {' '}
            <br />
            <br />
         Together we make up a peer to peer platform to find items new homes and build community. Together we will build connections
         that last beyond shared items.
          </p>
        </div>
      </div>
      <div className="landing-section-process">
        <div className="landing-content">
          <h1>
How It Works
          </h1>
          <div className="landing-triplet-box">
            <div className="landing-triplet">
              <img id="howitworks-one" alt="first step is post" src={process1} style={{ width: 150, height: 150 }} />
              <p>
Create a post requesting or giving an item along with your story.
              </p>
            </div>
            <div className="landing-triplet">
              <img id="howitworks-one" alt="second step is to find" src={process2} style={{ width: 150, height: 150 }} />
              <p>
A fellow users reads your story and starts a conversation.
              </p>
            </div>
            <div className="landing-triplet" id="landing-triplet-last">
              <img id="howitworks-one" alt="third step is to share an item and find a connection" src={process3} style={{ width: 150, height: 150 }} />
              <p>
You share an item and make a friend along the way!
              </p>
            </div>
          </div>
        </div>
      </div>
      {footer}
    </div>
  );
};


const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);


export default withRouter(connect(mapStateToProps, null)(Landing));
