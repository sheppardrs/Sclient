import React from 'react';
import { NavLink } from 'react-router-dom';
import { passwordreqUser } from '../actions/index';

// handles both singin and  sign up for now since both just require email & Password
// takes props:
// signinUser should be the action creator signinUser
// signupUser -> action creator signupUser
class PasswordResetReq extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
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
    const mail = this.state.email;
    passwordreqUser(mail);
    // reset local state
    this.setState({
      email: '',
      submitted: true,
    });
    e.preventDefault();
  }

  render() {
    const submittedMess = this.state.submitted ? (
      <div>
        Check your inbox, you should have received an email with a link to  verify your account. The link expires after 10 hours.
        <br />
        <br />
        <NavLink
          className="signin-link"
          to="/"
          exact
          role="link"
          tabIndex={-1}
        >Home
        </NavLink>
      </div>
    )
      :
      <div />;
    return (
      <div className="add-post">
        {submittedMess}
        <form onSubmit={this.handleSubmit} className="add-note-form">
          Request a password reset email by submitting the email tied to your account below:
          <textarea
            type="text"
            id="email-input"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button
            className="save-button"
            name="signin"
            type="submit"
            value="SignIn"
            onClick={this.handleSubmit}
          >
            Reset
          </button>
        </form>
      </div>
    );
  }
}

export default PasswordResetReq;
