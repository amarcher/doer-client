// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  const isLoggedIn = !!useCurrentUserId();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && Component ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/login?redirect=${encodeURIComponent(
                props.location.pathname
              )}`,
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
