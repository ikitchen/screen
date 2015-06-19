import { Store } from 'flummox';
import MessageList from '../domain/MessageList';


export default class MessageStore extends Store {
  constructor(flux) {
    super();

    const messageActions = flux.getActions('messages');
    this.register(messageActions.newMessage, this.handleNewMessage);
    this.messageCounter = 0;

    this.state = {
      messages: MessageList([])
    };
  }

  handleNewMessage(content) {
    this.messageCounter++;

    this.setState({
      messages: MessageList.update(this.state.messages, {
        $push: [{
          id: this.messageCounter,
          text: content,
        }]
      })
    });
  }
}