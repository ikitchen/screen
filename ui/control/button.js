import React from 'react';

const style = {
  width: '100%',
  height: '100%',
};

const Button = React.createClass({
  propTypes: {
    description: React.PropTypes.object.isRequired,
    action: React.PropTypes.func,
  },
  _onClick: function() {
    const action = this.props.action;
    if(action) {
      action();
    }
  },
  render: function() {
    return (
      <button
        onClick={this._onClick}
        style={style}>
        {this.props.description.caption}
      </button>
    );
  }
});

export default Button;