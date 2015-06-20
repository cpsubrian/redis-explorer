import React from 'react';
import router from './router';

router.run((Handler) => {
  React.render(<Handler/>, document.body)
});
