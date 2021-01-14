import React, { useCallback } from 'react';
import GoogleLogin from 'react-google-login';
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

interface Props {
  onComplete?: () => void;
}

export default function LoginButton({ onComplete }: Props) {
  const { push } = useHistory();
  const location = useLocation();
  const currentUserId = useCurrentUserId();
  const tokenId = useReactiveVar(tokenIdVar);
  const googleProfileObj = useReactiveVar(googleProfileObjVar);

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
    ({ tokenId, profileObj } = {}) => {
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
      }

      if (onComplete) onComplete();
    },
    [onComplete]
  );

  const onGoogleFailure = useCallback(({ error } = {}) => {
    console.log(error);
  }, []);

  return (
    <GoogleLogin
      clientId={GOOGLE.CLIENT_ID}
      render={({ onClick, disabled }) => (
        <Button onPress={onClick} disabled={disabled}>
          Login with Google
        </Button>
      )}
      onSuccess={onGoogleResponse}
      onFailure={onGoogleFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={!!currentUserId}
    />
  );
}
