import React from 'react';
import socketIOc from 'socket.io-client';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearChat } from '../actions';
// this should probably be decomposed into a few different components


// this component is based on the hackermoon article "A simple messaging app with react native and socket.io"
// https://hackernoon.com/a-simple-messaging-app-with-react-native-and-socket-io-e1cae3df7bda
const chatserverURL = 'http://localhost:3000'; // for local testing
// const chatserverURL = 'https://share-ity.herokuapp.com/'; // for heroku

// structure from stack overflow, heavily modified
// https://stackoverflow.com/questions/10599148/how-do-i-get-the-current-time-only-in-javascript
function timeHrsMin(dateString) {
  const date = new Date(dateString);
  let amPm;
  const h = date.getHours() > 12 ? (amPm = 'pm', date.getHours() - 12) : (amPm = 'am', date.getHours());
  const m = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  return (`${h}:${m} ${amPm}`);
}

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      conversations: [],
      message: '',
      new: this.props.startChat, // username for new conversation
      to: '', // should be conversation
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
    this.handleConvos = this.handleConvos.bind(this);
    this.selectConvo = this.selectConvo.bind(this);
    this.startConvo = this.startConvo.bind(this);
    this.newConvo = this.newConvo.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.socket.on('message', this.handleRec);
    this.socket.on('messages', this.handleLoad);
    this.socket.on('convos', this.handleConvos);
    this.socket.on('newConvo', this.newConvo);
  }

  componentDidMount() {
    console.log(this.state.new);
    if (this.props.startChat) {
      // this.setState({ new: this.props.startChat });
      // this.props.clearChat();
    }
  }

  // handle receiving the list of conversations that this user is in
  handleConvos(convos) {
    console.log('received convos', convos);
    this.setState({
      conversations: convos,
    });
  }

  newConvo() {
    console.log('REC newConvo');
    this.socket.emit('join', this.username);
  }
  // select a conversation
  // send a request for the messages of that conversation
  selectConvo(conversation, e) {
    console.log('selecting convo: ', conversation);
    this.setState({ to: conversation });
    this.socket.emit('convo', conversation);
    // remove new id and color
    const convoIndex = this.state.conversations.findIndex(i => i._id === conversation._id);
    const newConvos = this.state.conversations;
    newConvos[convoIndex].unseen = '';
    this.setState({ conversations: newConvos });
    e.preventDefault();
  }

  // handle receiving the past messages
  handleLoad(history) {
    console.log('received messages', history);
    this.setState({
      messages: history,
    });
  }

  // handle receiving a message
  // check that it is for the current conversation
  // TODO: deal with receiving other messages from other conversations
  handleRec(message) {
    if (message.to === this.state.to._id) {
      this.setState(prevState => ({
        messages: [...prevState.messages, message],
      }));
    } else {
      const convoIndex = this.state.conversations.findIndex(i => i._id === message.to);
      const newConvos = this.state.conversations;
      newConvos[convoIndex].unseen = this.username;
      this.setState({ conversations: newConvos });
    }
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

  startConvo(e) {
    this.socket.emit('startconvo', this.state.new);
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
        <div className="chat-controls">
          <div className="chat-conversations">
          Recent Conversations:
            {this.state.conversations.map((conversation) => {
            // console.log(this.state.request, post.request);
              return (
                <button
                  className={conversation._id === this.state.to._id ? 'chat-conversation-sel' : 'chat-conversation'}
                  id={conversation.unseen === this.username ? 'chat-new-messages' : ''}
                  key={conversation._id}
                //  value={conversation}
                  onClick={e => this.selectConvo(conversation, e)}
                >
                  {conversation.participants.map((participant) => {
                    if (participant === this.username) {
                      return (<div key={participant} />);
                    } else {
                      return (<div key={participant} className="chat-conversation-part">{participant}</div>);
                    }
                  })}
                </button>
              );
            })}
          </div>
          <div className="chat-startconvo">
            <form
              onSubmit={this.startConvo}
              className="startconvo-form"
            >
          New Conversation:
              <input
                type="text"
                name="new"
                placeholder="Username"
                value={this.state.new}
                onChange={this.handleChange}
                className="message-enter"
              />
              <button
                type="submit"
                className="save-button"
              >
              Start
              </button>
            </form>
          </div>
        </div>
        <div className="chat-messages">
          <div>
            {this.state.messages.map((message) => {
          // console.log(this.state.request, post.request);
            return (
              <div
                className={message.from === this.username ? 'message-box-sent' : 'message-box-rec'}
                key={message._id}
              >
                <div className="message-header">
                  <div className="message-author">
                    {message.from}
                  </div>
                  <div id="message-time" className="time">
                    {timeHrsMin(message.createdAt)}
                  </div>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    startChat: state.startChat,
  }
);


// export default Chat;
export default withRouter(connect(mapStateToProps, { clearChat })(Chat));
