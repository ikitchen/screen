import React from 'react';

import button from './control/button';
import LayoutItem from './layout-item';

const controls = {
  button 
};

const Control = React.createClass({
  propTypes: {
    description: React.PropTypes.object,
    onAction: React.PropTypes.func.isRequired,
  },
  _onAction: function(id) {
    this.props.onAction(id);
  },
  renderControl: function(meta) {
    const type = meta.type;
    const id = meta.id;
    const Ctrl = controls[type];
    const action = this._onAction.bind(this, id);
    return (<Ctrl description={meta} action={action} />);
  },
  render: function() {
    return (
      <LayoutItem description={this.props.description}>
        {this.renderControl(this.props.description)}
      </LayoutItem>
    );
  }
});

export default Control;