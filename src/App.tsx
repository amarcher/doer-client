import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Feed from './pages/Feed';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Route exact path="/" component={Feed} />
        <Route exact path="/profile" component={Profile} />
      </main>
    </Router>
  );
}

export default App;
