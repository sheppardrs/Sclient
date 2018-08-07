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
    };

    this.username = localStorage.getItem('username');
    // localStorage.setItem('token', response.data.token);

    this.socket = socketIOc(chatserverURL);
    this.handleRec = this.handleRec.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.socket.on('message', this.handleRec);
  }

  handleRec(message) {
    this.setState(prevState => ({
      messages: [...prevState.messages, message],
    }));
  }

  handleSend(e) {
    const mess = {
      content: this.state.message,
      username: this.username,
    };
    console.log('sending message', mess);
    this.socket.emit('message', mess);
    console.log('sent');
    this.setState({ message: '' });
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({ message: e.target.value });
    e.preventDefault();
  }

  render() {
    return (
      <div className="chat">
        Check server if it connected!
        {this.state.messages.map((message) => {
          // console.log(this.state.request, post.request);
            return (
              <div
                className={message.username === this.username ? 'message-box-sent' : 'message-box-rec'}
                key={message}
              >
                <div
                  className="message-author"
                >
                  {message.username}
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
          <input
            type="text"
            name="message"
            placeholder="Say something?"
            value={this.state.message}
            onChange={this.handleChange}
            className="message-enter"
          />
        </form>
      </div>
    );
  }
}


export default Chat;
