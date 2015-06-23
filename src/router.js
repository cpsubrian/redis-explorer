import React from 'react';
import Router from 'react-router';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import MainHandler from './handlers/MainHandler';
import BrowseHandler from './handlers/BrowseHandler';
import NotFoundHandler from './handlers/NotFoundHandler';

const routes = (
  <Route handler={MainHandler}>
    <Route name="browse" path="/" handler={BrowseHandler}/>
    <NotFoundRoute handler={NotFoundHandler}/>
  </Route>
);

const router = Router.create({
  routes: routes
});

export default router;
export {routes, router};