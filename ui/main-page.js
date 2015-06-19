import React from 'react';
import Screen from './screen';
import FluxComponent from 'flummox/component';


const MainPage = React.createClass({
  componentDidMount: function() {
    this.props.flux.getActions('screen').loadConfig();
  },

  onControlAction: function (id) {
    this.props.flux.getActions('screen').postAction(id);
  },

  render: function() {
    return (
      <div>
        <FluxComponent connectToStores={['screen']}>
          <Screen onControlAction={this.onControlAction} />
        </FluxComponent>
      </div>
    );
  }
});

export default MainPage;