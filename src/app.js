import React from 'react';
import router from './router';
import alt from './alt';

// Debug dispatcher.
alt.dispatcher.register(console.log.bind(console))

// Run the router.
router.run((Handler) => {
  React.render(<Handler/>, document.body)
});
