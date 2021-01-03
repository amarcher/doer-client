import React, { useEffect, useState, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import Title from '../../components/Title';
import UserForm from '../../components/UserForm';
import usePageTitle from '../../hooks/usePageTitle';
import GetUser from '../../queries/GetUser';
import UpdateUser from '../../mutations/UpdateUser';
import { getImageUploadInputsFromProfilePic } from '../../utils/images';
import { UpdateUser as UpdateUserResponse } from '../../mutations/__generated__/UpdateUser';
import { GetUser as GetUserResponse } from '../../queries/__generated__/GetUser';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';
import { ImageUploadInput } from '../../../__generated__/globalTypes';

import './EditProfile.css';

const emptyImageUploadInput = {} as { [photoId: string]: ImageUploadInput };

type Props = RouteComponentProps;

export default function EditProfile({ history: { push } }: Props) {
  const currentUserId = useCurrentUserId();
  const { data } = useQuery<GetUserResponse>(GetUser, {
    variables: {
      id: currentUserId,
    },
  });

  usePageTitle('Edit Profile');

  const [updateUserInput, setUpdateUserInput] = useState({
    firstName: data?.user?.firstName,
    lastName: data?.user?.lastName,
    bio: data?.user?.bio,
  });
  useEffect(() => {
    setUpdateUserInput({
      firstName: data?.user?.firstName,
      lastName: data?.user?.lastName,
      bio: data?.user?.bio,
    });
  }, [data?.user]);

  const [imageUploadInputs, setImageUploadInputs] = useState(
    getImageUploadInputsFromProfilePic(data?.user?.profilePic)
  );
  useEffect(() => {
    setImageUploadInputs(
      getImageUploadInputsFromProfilePic(data?.user?.profilePic)
    );
  }, [data?.user?.profilePic]);

  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (target && target.name) {
        setUpdateUserInput((prevUpdateUserInput) => ({
          ...prevUpdateUserInput,
          [target.name]: target.value,
        }));
      }
    },
    []
  );

  const [updateUser] = useMutation<UpdateUserResponse>(UpdateUser, {
    variables: {
      id: currentUserId,
      firstName: updateUserInput.firstName,
      lastName: updateUserInput.lastName,
      bio: updateUserInput.bio,
      imageUploadInput: Object.values(imageUploadInputs)[0],
    },

    onCompleted() {
      push('/profile');
    },
  });

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateUser();
    },
    [updateUser]
  );

  const onPhotoUploaded = useCallback(
    ({ publicId, hostedUrl, timeTaken }: Partial<ImageUploadInput>) => {
      if (!publicId) {
        return;
      }

      setImageUploadInputs((prevImageUploadInputs) => ({
        ...prevImageUploadInputs,
        [publicId]: {
          hostedUrl: hostedUrl || '',
          timeTaken: timeTaken || Date.now(),
          publicId,
        },
      }));
    },
    []
  );

  const onPhotoRemoved = useCallback(() => {
    setImageUploadInputs(emptyImageUploadInput);
  }, []);

  usePageTitle('Edit Your Profile');

  return (
    <form onSubmit={onSubmit}>
      <Title>Edit Your Profile</Title>

      <div className="EditProfile__hero">
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

      <UserForm fields={updateUserInput} onChange={onChange} />

      <div className="EditProfile__save_button">
        <Button onPress={updateUser}>Save</Button>
      </div>
    </form>
  );
}
