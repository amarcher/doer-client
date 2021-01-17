import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import LoginContext from './contexts/loginContext';
import useBooleanState from './hooks/useBooleanState';
import LoginModal from './components/LoginModal';
import isTouchDevice from './utils/touchDetection';

import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import Main from './pages/Main';
import Category from './pages/Category';
import Create from './pages/Create';
import Edit from './pages/Edit';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Attempt from './pages/Attempt';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

const DND_BACKEND = isTouchDevice() ? TouchBackend : HTML5Backend;

export default function App() {
  const {
    state: isLoginModalOpen,
    setTrue: openLoginModal,
    setFalse: closeLoginModal,
  } = useBooleanState(false);

  return (
    <LoginContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      <DndProvider backend={DND_BACKEND}>
        <Router>
          <LoginModal
            isOpen={isLoginModalOpen}
            onRequestClose={closeLoginModal}
          />
          <Nav />
          <main>
            <Switch>
              <Route exact path="/" component={Main} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute
                exact
                path="/profile/edit"
                component={EditProfile}
              />
              <Route path="/profile/:id/view" component={Profile} />
              <Route path="/category/:categoryId" component={Category} />
              <Route path="/project/:projectId" component={Project} />
              <Route path="/attempt/:projectExecutionId" component={Attempt} />
              <PrivateRoute path="/create" component={Create} />
              <PrivateRoute path="/edit" component={Edit} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
        </Router>
      </DndProvider>
    </LoginContext.Provider>
  );
}
