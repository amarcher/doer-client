import React, { useCallback } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { useHistory, useLocation } from 'react-router';
import { useQuery, useReactiveVar } from '@apollo/client';

import Button from './Button';
import { GOOGLE } from '../constants';
import { currentUserIdVar, googleIdVar, tokenIdVar } from '../cache';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import GetUser, { GetUserResponse } from '../queries/GetUser';
import { LOCAL_STORAGE_PREFIX as PREFIX } from '../constants';

import './Nav.css';

export default function Nav() {
  const history = useHistory();
  const location = useLocation();
  const currentUserId = useCurrentUserId();
  const googleId = useReactiveVar(googleIdVar);
  const isSignup = location.pathname.includes('signup');

  const { client } = useQuery<GetUserResponse>(GetUser, {
    variables: {
      id: googleId,
    },

    skip: !googleId || !!currentUserId,

    onCompleted: ({ user }) => {
      if (!user && !isSignup) {
        history.push(
          `/signup?redirect=${encodeURIComponent(window.location.pathname)}`
        );
      } else if (googleId && user && !currentUserId) {
        currentUserIdVar(user.id);
        localStorage.setItem(`${PREFIX}currentUserId`, user.id);
      }
    },
  });

  const onGoogleResponse = useCallback(
    ({ tokenId, googleId } = {}) => {
      googleIdVar(googleId);
      tokenIdVar(tokenId);
      currentUserIdVar(undefined);

      if (tokenId && googleId) {
        localStorage.setItem(`${PREFIX}tokenId`, tokenId);
        localStorage.setItem(`${PREFIX}googleId`, googleId);
      } else {
        localStorage.removeItem(`${PREFIX}tokenId`);
        localStorage.removeItem(`${PREFIX}googleId`);
        localStorage.removeItem(`${PREFIX}currentUserId`);
        client.resetStore();
        history.push('/');
      }
    },
    [client, history]
  );

  const onGoogleFailure = useCallback(({ error } = {}) => {
    console.log(error);
  }, []);

  return (
    <div className="nav">
      <nav className="nav__content">
        <ul className="nav__list">
          <li className="nav__list-item">
            {(currentUserId || (!currentUserId && googleId && isSignup)) && (
              <GoogleLogout
                clientId={GOOGLE.CLIENT_ID}
                onLogoutSuccess={onGoogleResponse}
                render={({ onClick, disabled }) => (
                  <Button onPress={onClick} disabled={disabled}>
                    {currentUserId ? 'Logout' : 'Cancel Signup'}
                  </Button>
                )}
              />
            )}
            {!currentUserId && !googleId && (
              <GoogleLogin
                clientId={GOOGLE.CLIENT_ID}
                render={({ onClick, disabled }) => (
                  <Button onPress={onClick} disabled={disabled}>
                    Login
                  </Button>
                )}
                onSuccess={onGoogleResponse}
                onFailure={onGoogleFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={!!currentUserId}
              />
            )}
          </li>
          <li className="nav__list-item">
            <Button href="/">Main</Button>
          </li>
          {currentUserId && (
            <li className="nav__list-item">
              <Button href="/profile">Profile</Button>
            </li>
          )}
        </ul>
      </nav>
      <div className="nav__spacer" />
    </div>
  );
}
