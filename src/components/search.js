import React from 'react';
import { NavLink } from 'react-router-dom';

// handles both singin and  sign up for now since both just require email & Password
// takes props:
// signinUser should be the action creator signinUser
// signupUser -> action creator signupUser
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      failed: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // change the state based on which input was changed
  handleChange(e) {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
  }

  // submit with the local state and reset local state
  handleSubmit(e) {
    // console.log('the event target is:', e.target.name, '.');
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    // console.log('You submitted:', user, '.');
    this.props.signinUser(user, this.props.history);
    // reset local state
    this.setState({
      email: '',
      password: '',
      failed: true,
    });
    e.preventDefault();
  }

  render() {
    const failedMess = this.state.failed ? (
      <div className="failure-mess">Sign in failed. Please{' '}
        <NavLink
          className="signup-link"
          to="/signup"
          exact
          role="link"
          tabIndex={-1}
        >sign up
        </NavLink>
        {' '}or try again.
      </div>)
      :
      <div />;
    return (
      <div className="add-post">
        {failedMess}
        <form onSubmit={this.handleSubmit} className="add-note-form">
          <textarea
            type="text"
            id="email-input"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <textarea
            type="text"
            id="password-input"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button
            className="signin-button"
            name="signin"
            type="submit"
            value="SignIn"
            onClick={this.handleSubmit}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
