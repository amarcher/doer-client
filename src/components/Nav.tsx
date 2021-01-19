import React, { useCallback } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { useHistory, useLocation } from 'react-router';
import { useQuery, useReactiveVar } from '@apollo/client';

import Button from './Button';
import { GOOGLE } from '../constants';
import { currentUserIdVar, googleProfileObjVar, tokenIdVar } from '../cache';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import Login from '../queries/Login';
import { Login as LoginResponse } from '../queries/__generated__/Login';
import { LOCAL_STORAGE_PREFIX as PREFIX } from '../constants';
import GetUser from '../queries/GetUser';
import { GetUser as GetUserResponse } from '../queries/__generated__/GetUser';
import { deauthenticate } from '../utils/auth';

import './Nav.css';
import Logo from './Logo2';

export default function Nav() {
  const { push } = useHistory();
  const location = useLocation();
  const currentUserId = useCurrentUserId();
  const tokenId = useReactiveVar(tokenIdVar);
  const googleProfileObj = useReactiveVar(googleProfileObjVar);
  const isSignup = location.pathname.includes('signup');

  const { client } = useQuery<LoginResponse>(Login, {
    skip: !tokenId || !googleProfileObj || !!currentUserId,

    onCompleted: ({ login }) => {
      const user = login?.user;
      const sessionToken = login?.sessionToken;
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
        push({
          pathname: '/signup',
          state: {
            redirect: location,
          },
        });
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
        deauthenticate();
        client.resetStore();
        push('/');
      }
    },
    [client, push]
  );

  const onGoogleFailure = useCallback(({ error } = {}) => {
    console.log(error);
  }, []);

  return (
    <div className="nav">
      <nav className="nav__content">
        <ul className="nav__list">
          <li className="nav__list-item" style={{paddingTop:"7px"}}>
            <a href="/"><Logo></Logo></a>
          </li>
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
