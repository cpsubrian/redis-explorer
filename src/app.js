import React from 'react';
import router from './router';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Run the router.
router.run((Handler) => {
  React.render(<Handler/>, document.body)
});
