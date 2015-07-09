import React from 'react'
import Router, {Route, NotFoundRoute} from 'react-router'

import MainHandler from './handlers/MainHandler'
import NotFoundHandler from './handlers/NotFoundHandler'
import BrowseHandler from './handlers/BrowseHandler'
import InfoHandler from './handlers/InfoHandler'

const routes = (
  <Route handler={MainHandler}>
    <Route name='browse' path='/' handler={BrowseHandler}/>
    <Route name='info' path='/info' handler={InfoHandler}/>
    <NotFoundRoute handler={NotFoundHandler}/>
  </Route>
)

const router = Router.create({
  routes: routes
})

export default router
export {routes, router}
