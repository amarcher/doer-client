import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import Title from '../../components/Title';
import UserForm from '../../components/UserForm';
import GetUser from '../../queries/GetUser';
import { GetUser as GetUserResponse } from '../../queries/__generated__/GetUser';
import CreateUser from '../../mutations/CreateUser';
import {
  CreateUserInput,
  ImageUploadInput,
} from '../../../__generated__/globalTypes';
import { CreateUser as CreateUserResponse } from '../../mutations/__generated__/CreateUser';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';
import { currentUserIdVar, googleProfileObjVar, tokenIdVar } from '../../cache';
import { LOCAL_STORAGE_PREFIX as PREFIX } from '../../constants';

import './Signup.css';

type Props = RouteComponentProps<{}, any, { redirect?: Location }>;

const emptyImageUploadInput = {} as { [photoId: string]: ImageUploadInput };

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

  const [imageUploadInputs, setImageUploadInputs] = useState(
    googleProfile.imageUrl
      ? ({
          googlePhoto: {
            hostedUrl: googleProfile.imageUrl,
            timeTaken: Date.now(),
          },
        } as { [photo: string]: ImageUploadInput })
      : emptyImageUploadInput
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
        imageUploadInput: Object.values(imageUploadInputs)[0],
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

      onCompleted({ createUser }) {
        const id = createUser?.user?.id || '';
        const sessionToken = createUser?.sessionToken;

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
    ({ publicId, hostedUrl }: Partial<ImageUploadInput>) => {
      if (!publicId) {
        return;
      }

      setImageUploadInputs((prevImageUploadInputs) => ({
        ...prevImageUploadInputs,
        [publicId]: {
          hostedUrl: hostedUrl || '',
          timeTaken: Date.now(),
        },
      }));
    },
    []
  );

  const onPhotoRemoved = useCallback(() => {
    setImageUploadInputs(emptyImageUploadInput);
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
          images={imageUploadInputs}
          height={280}
          width={280}
          maxFiles={1}
        />
      </div>

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}

      <UserForm fields={createUserInput} onChange={onChange} />

      <div className="Signup__create_button">
        <Button onPress={createUser}>Create</Button>
      </div>
    </form>
  );
}
