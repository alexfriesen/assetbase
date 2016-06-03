import React from 'react';
import { Route } from 'react-router';

// route components
import AppContainer from './containers/AppContainer';
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Asset from "./containers/AssetContainer";
import User from "./pages/User";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import NotFound from "./pages/NotFound";

export const routes = (
  <Route component={AppContainer}>
    <Route path="/" component={Dashboard} />
    <Route path="/categories(/:id)" component={Categories} />
    <Route path="/asset/:id(/:method)" component={Asset} />
    <Route path="/user/:id(/:method)" component={User} />
    <Route path="/about" component={About} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;