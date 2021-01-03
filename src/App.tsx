import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import Main from './pages/Main';
import Category from './pages/Category';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Attempt from './pages/Attempt';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Route exact path="/" component={Main} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/category/:categoryId" component={Category} />
        <Route path="/project/:projectId" component={Project} />
        <Route path="/attempt/:projectExecutionId" component={Attempt} />
        <PrivateRoute path="/create" component={Create} />
        <PrivateRoute path="/edit" component={Edit} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </main>
    </Router>
  );
}
