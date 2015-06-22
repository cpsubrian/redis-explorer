import React from 'react';
import Router from 'react-router';
import {Route, DefaultRoute} from 'react-router';

import MainHandler from './handlers/MainHandler';
import HomeHandler from './handlers/HomeHandler';

const routes = (
  <Route name="main" path="/" handler={MainHandler}>
    <DefaultRoute name="home" handler={HomeHandler}/>
  </Route>
);

const router = Router.create({
  routes: routes
});

export default router;
export {routes, router};