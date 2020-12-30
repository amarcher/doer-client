import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { RouteComponentProps } from 'react-router';
import { decode } from 'querystring';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import Title from '../../components/Title';
import GetUser, { GetUserResponse } from '../../queries/GetUser';
import CreateUser, {
  CreateUserResponse,
  User as CreateUserInput,
} from '../../mutations/CreateUser';

import './Signup.css';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';
import { currentUserIdVar, googleIdVar, tokenIdVar } from '../../cache';
import { LOCAL_STORAGE_PREFIX as PREFIX } from '../../constants';

type Props = RouteComponentProps;

interface ImageUploadInput {
  publicId?: string;
  hostedUrl?: string;
  timeTaken?: number;
}

export default function Signup({ history, location: { search } }: Props) {
  const { redirect = '%2F' } = decode(search?.substr(1));
  const currentUserId = useCurrentUserId();
  const googleId = useReactiveVar(googleIdVar);

  useEffect(() => {
    if (currentUserId) {
      history.push(decodeURIComponent(redirect as string));
    } else if (!googleId) {
      history.replace('/');
    }
  }, [currentUserId, googleId, history, redirect]);

  const [createUserInput, setCreateUserInput] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: '',
  } as CreateUserInput);

  const [imageUploadInput, setImageUploadInput] = useState(
    {} as ImageUploadInput
  );

  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (target && target.name) {
        setCreateUserInput((prevCreateUserInput) => ({
          ...prevCreateUserInput,
          [target.name]: target.value,
        }));
      }
    },
    []
  );

  const [createUser, { error, loading }] = useMutation<CreateUserResponse>(
    CreateUser,
    {
      variables: {
        createUserInput,
        imageUploadInput,
      },

      update: (cache, { data }) => {
        if (data?.user) {
          cache.writeQuery<GetUserResponse>({
            query: GetUser,
            data: {
              user: data?.user,
            },
          });
        }
      },

      onCompleted({ user: { id }, sessionToken }) {
        currentUserIdVar(id);
        tokenIdVar(sessionToken);
        localStorage.setItem(`${PREFIX}currentUserId`, id);
        localStorage.setItem(`${PREFIX}tokenId`, sessionToken);
        history.push('/profile');
      },
    }
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createUser();
    },
    [createUser]
  );

  const onPhotoUploaded = useCallback(
    ({ publicId, url: hostedUrl }: { publicId: string; url?: string }) => {
      setImageUploadInput((prevImageUploadInput?: ImageUploadInput) => ({
        ...prevImageUploadInput,
        hostedUrl: hostedUrl || prevImageUploadInput?.hostedUrl || '',
        timeTaken: Date.now(),
      }));
    },
    []
  );

  const onPhotoRemoved = useCallback((removedPublicId) => {
    setImageUploadInput({});
  }, []);

  usePageTitle('Create Your Profile');

  return (
    <form onSubmit={onSubmit}>
      <Title>Create Your Profile</Title>

      <div className="Create__hero">
        <ImageUploader
          onPhotoUploaded={onPhotoUploaded}
          onPhotoRemoved={onPhotoRemoved}
          height={480}
          width={480}
          maxFiles={1}
        />
      </div>

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}

      <label className="Create__label">
        Username:{' '}
        <input
          name="username"
          type="text"
          onChange={onChange}
          value={createUserInput.username || ''}
          placeholder="Username"
          required
        />
      </label>

      <label className="Create__label">
        First Name:{' '}
        <input
          name="firstName"
          type="text"
          onChange={onChange}
          value={createUserInput.firstName || ''}
          placeholder="First"
          required
        />
      </label>

      <label className="Create__label">
        Last Name:{' '}
        <input
          name="lastName"
          type="text"
          onChange={onChange}
          value={createUserInput.lastName || ''}
          placeholder="Last"
          required
        />
      </label>

      <label className="Create__label">
        Email:{' '}
        <input
          name="email"
          type="text"
          onChange={onChange}
          value={createUserInput.email || ''}
          placeholder="Email"
          required
        />
      </label>

      <label className="Create__label">
        Bio:{' '}
        <textarea
          name="bio"
          onChange={onChange}
          value={createUserInput.bio || ''}
          placeholder="How did you start doing?"
          required
        />
      </label>

      <p>
        <Button onPress={createUser}>Create</Button>
      </p>
    </form>
  );
}
