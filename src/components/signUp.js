import React from 'react';


// handles both singin and  sign up for now since both just require email & Password
// takes props:
// signinUser should be the action creator signinUser
// signupUser -> action creator signupUser
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
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
      username: this.state.username,
    };
    // console.log('You submitted:', user, '.');
    this.props.signupUser(user, this.props.history);
    // reset local state
    this.setState({
      email: '',
      password: '',
      username: '',
      failed: true,
    });
    e.preventDefault();
  }

  render() {
    const failedMess = this.state.failed ? (
      <div className="failure-mess">Sign up failed. Please try again
        and be sure to fill each field.
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
          <textarea
            type="text"
            id="username-input"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className="signup-button"
            name="signup"
            type="submit"
            value="SignUp"
            onClick={this.handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
