import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection, FileError } from 'react-dropzone';
import {
  uploadPhoto,
  deletePhoto,
  OnPhotoUploadProgressInputs,
} from '../api/cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { CLOUDINARY } from '../constants';
import ImageUploadThumbnail from './ImageUploadThumbnail';

import './ImageUploader.css';

interface Props {
  onPhotoUploaded: ({
    url,
    publicId,
    caption,
  }: {
    caption?: string;
    url?: string;
    publicId: string;
  }) => void;
  onPhotoRemoved?: (publicId: string) => void;
  height?: number;
  maxFiles?: number;
  width?: number;
  withCaption?: boolean;
}

function getFileErrorMessage(code: FileError['code']) {
  return {
    'file-too-large': 'Image too large',
    'file-too-small': 'Image too small',
    'too-many-files': 'Too many files',
    'file-invalid-type': 'Invalid file type',
  }[code];
}

function stopPropagation(e: React.SyntheticEvent) {
  e.stopPropagation();
}

export default function ImageUploader({
  onPhotoUploaded,
  onPhotoRemoved,
  height = 500,
  width = 500,
  withCaption,
  maxFiles,
}: Props) {
  const [photos, setPhotos] = useState(
    {} as { [photoId: string]: OnPhotoUploadProgressInputs }
  );
  const [captions, setCaptions] = useState({} as { [photoId: string]: string });
  const [errors, setErrors] = useState(
    {} as { [photoId: string]: FileRejection }
  );

  const onPhotoUploadProgress = useCallback(
    ({ photoId, percent, response }: OnPhotoUploadProgressInputs) => {
      setPhotos((prevPhotos) => {
        const oldPhoto = prevPhotos[photoId] || {};
        const newPhoto = {
          photoId,
          percent: percent != null ? percent : oldPhoto.percent,
          response: response || oldPhoto.response,
        };

        return {
          ...prevPhotos,
          [photoId]: newPhoto,
        };
      });

      if (response) {
        const {
          body: { url, public_id: publicId },
        } = response;
        onPhotoUploaded({ publicId, url });
      }
    },
    [onPhotoUploaded]
  );

  const onChangeCaption = useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setCaptions((prevCaptions) => ({
        ...prevCaptions,
        [name]: value,
      }));

      const publicId = photos[name].response?.body.public_id;
      if (publicId) onPhotoUploaded({ publicId, caption: value });
    },
    [onPhotoUploaded, photos]
  );

  const onDelete = useCallback(
    (photoId: string) => {
      const deleteToken = photos[photoId]?.response?.body.delete_token;
      const { [photoId]: removedPhoto, ...remainingPhotos } = photos;
      const { [photoId]: _removedCaption, ...remainingCaptions } = captions;
      const { [photoId]: _removedError, ...remainingErrors } = errors;
      const removedPublicId = removedPhoto?.response?.body.public_id;

      if (deleteToken) {
        deletePhoto(deleteToken);
      }

      if (onPhotoRemoved && removedPublicId) onPhotoRemoved(removedPublicId);
      setErrors(remainingErrors);
      setPhotos(remainingPhotos);
      setCaptions(remainingCaptions);
    },
    [photos, errors, captions, onPhotoRemoved]
  );

  const onPhotoUploadError = useCallback(
    ({
      photoId,
      fileRejection,
    }: {
      photoId: string;
      fileRejection: FileRejection;
    }) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [photoId]: fileRejection,
      }));
    },
    []
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      acceptedFiles.forEach((file) => uploadPhoto(file, onPhotoUploadProgress));
      fileRejections.forEach((fileRejection) => {
        onPhotoUploadError({
          photoId: uuidv4(),
          fileRejection,
        });
      });
    },
    [onPhotoUploadProgress, onPhotoUploadError]
  );

  const disabled = !!maxFiles && Object.keys(photos).length >= maxFiles;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: CLOUDINARY.MAX_SIZE,
    maxFiles,
    disabled,
  });

  return (
    <div>
      <div {...getRootProps()} className="ImageUploader__root">
        <input className="ImageUploader" {...getInputProps()} />
        {!disabled && (
          <p>
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag files here, or click to select files'}
          </p>
        )}
        <div className="ImageUploader__thumbnails">
          {Object.values(photos).map(({ photoId, percent, response }) => (
            <div key={photoId} className="ImageUploader__thumbnail">
              <ImageUploadThumbnail
                id={photoId}
                src={response?.body.url}
                percent={percent}
                onDeletePhoto={onDelete}
                height={height}
                width={width}
              />
              {withCaption && response?.body.url && (
                <input
                  className="ImageUploader__caption"
                  type="text"
                  name={photoId}
                  placeholder="caption"
                  value={captions[photoId] || ''}
                  onClick={stopPropagation}
                  onChange={onChangeCaption}
                />
              )}
            </div>
          ))}
          {Object.keys(errors).map((photoId) => (
            <div key={photoId} className="ImageUploader__thumbnail">
              <ImageUploadThumbnail
                id={photoId}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Blank-document-broken.svg/1024px-Blank-document-broken.svg.png"
                percent={100}
                onDeletePhoto={onDelete}
                height={height}
                width={width}
              />
              <div className="ImageUploader__error">
                <p>{getFileErrorMessage(errors[photoId].errors[0].code)}</p>
                <p>{errors[photoId].file.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
