import React from 'react';
import socketIOc from 'socket.io-client';

// this component is based on the hackermoon article "A simple messaging app with react native and socket.io"
// https://hackernoon.com/a-simple-messaging-app-with-react-native-and-socket-io-e1cae3df7bda
const chatserverURL = 'http://localhost:3000';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: '',
      to: '',
    };

    this.username = localStorage.getItem('username');
    // localStorage.setItem('token', response.data.token);

    // set up socket.io connections
    this.socket = socketIOc(chatserverURL);
    this.socket.emit('join', this.username);

    // binding functions to this
    this.handleRec = this.handleRec.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);

    this.socket.on('message', this.handleRec);
    this.socket.on('messages', this.handleLoad);
  }

  // handle receiving the past messages
  handleLoad(history) {
    this.setState({
      messages: history,
    });
  }

  // handle receiving a message
  handleRec(message) {
    this.setState(prevState => ({
      messages: [...prevState.messages, message],
    }));
  }

  handleSend(e) {
    const mess = {
      content: this.state.message,
      from: this.username,
      to: this.state.to,
    };
    console.log('sending message', mess);
    this.socket.emit('message', mess);
    console.log('sent');
    this.setState({ message: '' });
    e.preventDefault();
  }

  handleChange(e) {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
    e.preventDefault();
  }

  render() {
    return (
      <div className="chat">
        To:
        <input
          type="text"
          name="to"
          placeholder="Username"
          value={this.state.to}
          onChange={this.handleChange}
          className="message-enter"
        />
        {this.state.messages.map((message) => {
          // console.log(this.state.request, post.request);
            return (
              <div
                className={message.from === this.username ? 'message-box-sent' : 'message-box-rec'}
                key={message._id}
              >
                <div
                  className="message-author"
                >
                  {message.from}
                </div>
                <div
                  className="message-content-sent"
                >
                  {message.content}
                </div>
              </div>
            );
          })}
        <form
          onSubmit={this.handleSend}
          className="message-form"
        >
          Message:
          <input
            type="text"
            name="message"
            placeholder="Say something?"
            value={this.state.message}
            onChange={this.handleChange}
            className="message-enter"
          />
          <button
            type="submit"
            className="save-button"
          >
              Send
          </button>
        </form>
      </div>
    );
  }
}


export default Chat;
