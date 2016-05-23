import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import Dashboard from "../../ui/pages/Dashboard";
import Categories from "../../ui/pages/Categories";
import About from "../../ui/pages/About";
import Asset from "../../ui/pages/Asset";
import User from "../../ui/pages/User";

import NotFound from "../../ui/pages/NotFound";

export const renderRoutes = () => (
<Router history={ browserHistory }>
  <Route path="/" component={ AppContainer }>
    <IndexRoute component={ Dashboard } />
    <Route path="/categories(/:id)" component={ Categories } />
    <Route path="/asset/:id(/:method)" component={ Asset } />
    <Route path="/user/:id(/:method)" component={ User } />
    <Route path="/about" component={ About } />
    <Route path="*" component={ NotFound } />
  </Route>
</Router>
);