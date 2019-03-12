import React from 'react';
import { NavLink } from 'react-router-dom';
import { passwordUser } from '../actions/index';

// handles both singin and  sign up for now since both just require email & Password
// takes props:
// signinUser should be the action creator signinUser
// signupUser -> action creator signupUser
class PasswordReset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      submitted: false,
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
    // console.log('You submitted:', user, '.');
    const pass = this.state.password;
    passwordUser(pass, this.props.match.params[0]);
    // reset local state
    this.setState({
      password: '',
      submitted: true,
    });
    e.preventDefault();
  }

  render() {
    console.log('params[0]', this.props.match.params[0]);
    const submittedMess = this.state.submitted ? (
      <div>
        Your password should be reset.
        <br />
        <br />
        <NavLink
          className="signin-link"
          to="/signin"
          exact
          role="link"
          tabIndex={-1}
        >
Sign In
        </NavLink>
      </div>
    )
      : <div />;
    return (
      <div className="add-post">
        {submittedMess}
        <form onSubmit={this.handleSubmit} className="add-note-form">
            Enter a new password below:
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button
            className="save-button"
            name="signin"
            type="submit"
            value="SignIn"
            onClick={this.handleSubmit}
          >
            Set
          </button>
        </form>
      </div>
    );
  }
}

export default PasswordReset;
