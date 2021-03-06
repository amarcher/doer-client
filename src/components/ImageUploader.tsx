import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useDropzone, FileRejection, FileError } from 'react-dropzone';
import {
  uploadPhoto,
  deletePhoto,
  OnPhotoUploadProgressInputs,
} from '../api/cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { CLOUDINARY } from '../constants';
import isTouchDevice from '../utils/touchDetection';
import ImageUploadThumbnail from './ImageUploadThumbnail';
import { ImageUploadInput } from '../../__generated__/globalTypes';

import './ImageUploader.css';

export type Images = Record<string, ImageUploadInput>;

interface Props {
  onPhotoUploaded: (imageUploadInput: Partial<ImageUploadInput>) => void;
  images?: Images;
  getImageOrder?: (publicId: string) => number;
  imageOrder?: string[];
  thumbnailClassName?: string;
  onPhotoRemoved?: (publicId?: string) => void;
  onPhotoReordered?: (publicId: string, nextOrder: number) => void;
  height?: number;
  maxFiles?: number;
  width?: number;
  withCaption?: boolean;
  tags?: string[];
}

function getFileErrorMessage(code: FileError['code']) {
  return {
    'file-too-large': 'Image too large',
    'file-too-small': 'Image too small',
    'too-many-files': 'Too many files',
    'file-invalid-type': 'Invalid file type',
  }[code];
}

function formatImagesAsCaptions(images?: Images) {
  if (!images || Object.keys(images).length === 0) {
    return {} as { [photoId: string]: string };
  }

  return Object.keys(images).reduce((captions, photoId) => {
    const caption = images[photoId].caption || '';
    captions[photoId] = caption;
    return captions;
  }, {} as { [photoId: string]: string });
}

function formatImagesAsOnPhotoUploadProgressInputs(images?: Images) {
  if (!images || Object.keys(images).length === 0) {
    return {} as { [photoId: string]: OnPhotoUploadProgressInputs };
  }

  return Object.keys(images).reduce((progressInputs, photoId) => {
    const image = images[photoId];
    progressInputs[photoId] = {
      photoId,
      percent: 100,
      response: {
        body: {
          secure_url:
            image.hostedUrl && image.hostedUrl.indexOf('https') > -1
              ? image.hostedUrl
              : '',
          url: image.hostedUrl || '',
          public_id: photoId,
        },
        status: 'complete',
      },
    };
    return progressInputs;
  }, {} as { [photoId: string]: OnPhotoUploadProgressInputs });
}

function stopPropagation(e: React.SyntheticEvent) {
  e.stopPropagation();
}

const UPLOAD_MESSAGE = isTouchDevice()
  ? 'Touch to select files'
  : 'Drag files here, or click to select files';

export default function ImageUploader({
  onPhotoUploaded,
  onPhotoRemoved,
  onPhotoReordered,
  thumbnailClassName,
  height = 300,
  width = 300,
  withCaption,
  maxFiles,
  tags,
  images,
  getImageOrder,
}: Props) {
  const [photos, setPhotos] = useState(
    formatImagesAsOnPhotoUploadProgressInputs(images)
  );
  useEffect(() => {
    setPhotos(formatImagesAsOnPhotoUploadProgressInputs(images));
  }, [images]);

  const [captions, setCaptions] = useState(formatImagesAsCaptions(images));
  useEffect(() => {
    setCaptions(formatImagesAsCaptions(images));
  }, [images]);

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
          body: { url, secure_url, public_id: publicId },
        } = response;
        onPhotoUploaded({
          publicId,
          hostedUrl: secure_url || url,
        });
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

      if (onPhotoRemoved) onPhotoRemoved(removedPublicId);
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
      acceptedFiles.forEach((file) =>
        uploadPhoto({ file, onPhotoUploadProgress, tags })
      );
      fileRejections.forEach((fileRejection) => {
        onPhotoUploadError({
          photoId: uuidv4(),
          fileRejection,
        });
      });
    },
    [onPhotoUploadProgress, onPhotoUploadError, tags]
  );

  const disabled = !!maxFiles && Object.keys(photos).length >= maxFiles;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: CLOUDINARY.MAX_SIZE,
    maxFiles,
    disabled,
  });

  const sortedPhotos = useMemo(() => {
    return getImageOrder
      ? Object.values(photos).sort(
          (a, b) => getImageOrder(a.photoId) - getImageOrder(b.photoId)
        )
      : Object.values(photos);
  }, [getImageOrder, photos]);

  return (
    <div>
      <div {...getRootProps()} className="ImageUploader__root">
        <input className="ImageUploader" {...getInputProps()} />
        {!disabled && (
          <p>{isDragActive ? 'Drop files here to upload' : UPLOAD_MESSAGE}</p>
        )}
        <div className="ImageUploader__thumbnails">
          {sortedPhotos.map(({ photoId, percent, response }) => {
            return (
              <div key={photoId} className="ImageUploader__thumbnail">
                <ImageUploadThumbnail
                  id={photoId}
                  src={response?.body.secure_url || response?.body.url}
                  percent={percent}
                  onDeletePhoto={onDelete}
                  height={height}
                  width={width}
                  className={thumbnailClassName}
                  order={getImageOrder ? getImageOrder(photoId) : undefined}
                  onPhotoReordered={onPhotoReordered}
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
            );
          })}
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
