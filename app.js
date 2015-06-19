import 'babel-core/polyfill';
import React from 'react';
import FluxComponent from 'flummox/component';
import Flux from './flux/flux';
import MainPage from './ui/main-page';

var App = React.createClass({
  render: function() {
    return (
      <FluxComponent flux={this.props.flux}>
        <MainPage />
      </FluxComponent>
    );
  }
});

const flux = new Flux();
React.render(<App flux={flux}/>, document.body);

