import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import Title from '../../components/Title';
import GetUser, { GetUserResponse } from '../../queries/GetUser';
import CreateUser, {
  CreateUserResponse,
  User as CreateUserInput,
} from '../../mutations/CreateUser';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';
import { currentUserIdVar, googleProfileObjVar, tokenIdVar } from '../../cache';
import { LOCAL_STORAGE_PREFIX as PREFIX } from '../../constants';

import './Signup.css';

type Props = RouteComponentProps<{}, any, { redirect?: Location }>;

export interface ImageUploadInput {
  publicId?: string;
  hostedUrl?: string;
  timeTaken?: number;
}

export default function Signup({
  history: { push, replace },
  location: { state },
}: Props) {
  const currentUserId = useCurrentUserId();
  const googleProfileObj = useReactiveVar(googleProfileObjVar);
  const googleProfile = useMemo(
    () => (googleProfileObj ? JSON.parse(googleProfileObj) : {}),
    [googleProfileObj]
  );

  useEffect(() => {
    if (currentUserId && state?.redirect) {
      push(state?.redirect);
    } else if (currentUserId || !googleProfileObj) {
      replace('/');
    }
  }, [currentUserId, googleProfileObj, push, replace, state?.redirect]);

  const [createUserInput, setCreateUserInput] = useState({
    firstName: googleProfile.givenName || '',
    lastName: googleProfile.familyName || '',
    email: googleProfile.email || '',
    username: googleProfile.email?.split('@')[0] || '',
    bio: '',
  } as CreateUserInput);

  const [imageUploadInput, setImageUploadInput] = useState({
    hostedUrl: googleProfile.imageUrl || '',
    timeTaken: Date.now(),
  } as ImageUploadInput);

  const images = useMemo(() => ({ photo: { ...imageUploadInput } }), [
    imageUploadInput,
  ]);

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
        if (data?.createUser?.user) {
          cache.writeQuery<GetUserResponse>({
            query: GetUser,
            data: {
              user: data?.createUser?.user,
            },
          });
        }
      },

      onCompleted({
        createUser: {
          user: { id },
          sessionToken,
        },
      }) {
        currentUserIdVar(id);
        tokenIdVar(`Bearer ${sessionToken}`);
        localStorage.setItem(`${PREFIX}currentUserId`, id);
        localStorage.setItem(`${PREFIX}tokenId`, `Bearer ${sessionToken}`);
        push('/profile');
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

      <div className="Signup__hero">
        <ImageUploader
          onPhotoUploaded={onPhotoUploaded}
          onPhotoRemoved={onPhotoRemoved}
          thumbnailClassName="Signup__upload_thumbnail"
          images={images}
          height={280}
          width={280}
          maxFiles={1}
        />
      </div>

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}

      <div className="Signup__form">
        <label className="Signup__label">
          <span className="Signup__label_text">Username: </span>
          <input
            className="Signup__input"
            name="username"
            type="text"
            onChange={onChange}
            value={createUserInput.username || ''}
            placeholder="Username"
            required
          />
        </label>

        <label className="Signup__label">
          <span className="Signup__label_text">First Name: </span>
          <input
            className="Signup__input"
            name="firstName"
            type="text"
            onChange={onChange}
            value={createUserInput.firstName || ''}
            placeholder="First"
            required
          />
        </label>

        <label className="Signup__label">
          <span className="Signup__label_text">Last Name: </span>
          <input
            className="Signup__input"
            name="lastName"
            type="text"
            onChange={onChange}
            value={createUserInput.lastName || ''}
            placeholder="Last"
            required
          />
        </label>

        <label className="Signup__label">
          <span className="Signup__label_text">Email: </span>
          <input
            className="Signup__input"
            name="email"
            type="text"
            onChange={onChange}
            value={createUserInput.email || ''}
            placeholder="Email"
            required
          />
        </label>

        <label className="Signup__label">
          <span className="Signup__label_text">Bio: </span>
          <textarea
            className="Signup__input"
            name="bio"
            onChange={onChange}
            value={createUserInput.bio || ''}
            placeholder="How did you start doing?"
            required
          />
        </label>

        <div className="Signup__create_button">
          <Button onPress={createUser}>Create</Button>
        </div>
      </div>
    </form>
  );
}
