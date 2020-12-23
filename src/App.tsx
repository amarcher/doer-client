import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Main from './pages/Main';
import Category from './pages/Category';
import Create from './pages/Create';
import Profile from './pages/Profile';
import Project from './pages/Project';

export default function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Route exact path="/" component={Main} />
        <Route exact path="/profile/:id?" component={Profile} />
        <Route exact path="/category/:categoryId" component={Category} />
        <Route exact path="/project/:projectId" component={Project} />
        <Route exact path="/create" component={Create} />
      </main>
    </Router>
  );
}
