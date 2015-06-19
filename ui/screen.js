import React from 'react';
import Control from './control';

const Screen = React.createClass({
  propTypes: {
    onControlAction: React.PropTypes.func,
  },

  renderControls: function() {
    const conf = this.props.config || {};
    const ctrls = conf.controls || [];
    return ctrls.map((ctrl) => {
      return <Control description={ctrl} key={ctrl.id} onAction={this._onControlAction} />
    });
  },

  _onControlAction: function (id) {
    this.props.onControlAction(id);
  },

  render: function() {
    return (
      <div style={{position:'relative'}}>
        {this.renderControls()}
      </div>
    );
  }
});

export default Screen;