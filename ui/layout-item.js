import React from 'react';

// import button from './control/button';

// const controls = {
//   button 
// };

const gridSize = 40;

const LayoutItem = React.createClass({
  propTypes: {
    description: React.PropTypes.object,
  },
  calculateCss: function(meta) {
    const [x, y, w, h] = [
      meta.x || 0,
      meta.y || 0,
      meta.w || 1,
      meta.h || 1,
    ];

    const [xp, yp, wp, hp] = [x, y, w, h].map(it => it * gridSize);

    return {
      top     : yp,
      left    : xp,
      width   : wp,
      height  : hp,
      position: 'absolute',
    };
  },
  render: function() {
    const style = this.calculateCss(this.props.description);
    return (
      <div style={style}>{this.props.children}</div>
    );
  }
});

export default LayoutItem;