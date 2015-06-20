import React from 'react';
import Router from 'react-router';
import {Route, DefaultRoute} from 'react-router';

import Main from './components/Main';
import Home from './components/Home';

const routes = (
  <Route name="main" path="/" handler={Main}>
    <DefaultRoute name="home" handler={Home}/>
  </Route>
);

const router = Router.create({
  routes: routes
});

export default router;
export {routes, router};