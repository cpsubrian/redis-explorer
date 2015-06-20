import React from 'react';
import Router from 'react-router';
import {Route, DefaultRoute, RouteHandler} from 'react-router';

import Home from './components/Home';

const App = React.createClass({
  render () {
    return (
      <RouteHandler/>
    );
  }
});

const routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="home" handler={Home}/>
  </Route>
);

const router = Router.create({
  routes: routes
});

export default router;
export {routes, router};