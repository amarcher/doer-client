import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Main from './pages/Main';
import Category from './pages/Category';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Route exact path="/" component={Main} />
        <Route exact path="/profile/:id?" component={Profile} />
        <Route exact path="/category/:categoryId" component={Category} />
      </main>
    </Router>
  );
}

export default App;
