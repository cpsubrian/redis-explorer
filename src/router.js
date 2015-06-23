import React from 'react';
import Router from 'react-router';
import {Route, DefaultRoute} from 'react-router';

import MainHandler from './handlers/MainHandler';
import BrowseHandler from './handlers/BrowseHandler';

const routes = (
  <Route name="main" path="/" handler={MainHandler}>
    <DefaultRoute name="browse" handler={BrowseHandler}/>
  </Route>
);

const router = Router.create({
  routes: routes
});

export default router;
export {routes, router};