import React from 'react';

const MsgList = React.createClass({
  renderMessages: function(messages) {
    return messages.map(msg => <li>{msg.id}: {msg.text}</li>).reverse();
  },

  render: function() {
    return (
      <ul>
        {this.renderMessages(this.props.messages)}
      </ul>
    );
  }
});

export default MsgList;