import React from 'react';
import router from './router';

// Run the router.
router.run((Handler) => {
  React.render(<Handler/>, document.body)
});
