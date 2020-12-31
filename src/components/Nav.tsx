import React, { useCallback } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { useHistory, useLocation } from 'react-router';
import { useQuery, useReactiveVar } from '@apollo/client';

import Button from './Button';
import { GOOGLE } from '../constants';
import { currentUserIdVar, googleProfileObjVar, tokenIdVar } from '../cache';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import Login, { LoginResponse } from '../queries/Login';
import { LOCAL_STORAGE_PREFIX as PREFIX } from '../constants';

import './Nav.css';
import GetUser, { GetUserResponse } from '../queries/GetUser';

export default function Nav() {
  const history = useHistory();
  const location = useLocation();
  const currentUserId = useCurrentUserId();
  const tokenId = useReactiveVar(tokenIdVar);
  const googleProfileObj = useReactiveVar(googleProfileObjVar);
  const isSignup = location.pathname.includes('signup');

  const { client } = useQuery<LoginResponse>(Login, {
    skip: !tokenId || !googleProfileObj || !!currentUserId,

    onCompleted: ({ login: { user, sessionToken } }) => {
      if (tokenId && user && !currentUserId) {
        currentUserIdVar(user.id);
        tokenIdVar(`Bearer ${sessionToken}`);
        localStorage.setItem(`${PREFIX}currentUserId`, user.id);
        localStorage.setItem(`${PREFIX}tokenId`, `Bearer ${sessionToken}`);
        client.writeQuery<GetUserResponse>({
          query: GetUser,
          variables: {
            id: user.id,
          },
          data: {
            user,
          },
        });
      }
    },

    onError: ({ message }) => {
      if (message.indexOf('create this user') > -1) {
        history.push(
          `/signup?redirect=${encodeURIComponent(
            location.pathname + '?' + location.search
          )}`
        );
      }
    },
  });

  const onGoogleResponse = useCallback(
    ({ tokenId, profileObj, ...rest } = {}) => {
      googleProfileObjVar(profileObj ? JSON.stringify(profileObj) : undefined);
      tokenIdVar(tokenId);
      currentUserIdVar(undefined);
      localStorage.removeItem(`${PREFIX}currentUserId`);

      if (tokenId && profileObj) {
        localStorage.setItem(`${PREFIX}tokenId`, tokenId);
        localStorage.setItem(
          `${PREFIX}googleProfileObj`,
          JSON.stringify(profileObj)
        );
      } else {
        localStorage.removeItem(`${PREFIX}tokenId`);
        localStorage.removeItem(`${PREFIX}googleProfileObj`);
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
            {(currentUserId || (!currentUserId && tokenId && isSignup)) && (
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
            {!currentUserId && !tokenId && (
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
