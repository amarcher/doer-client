import React, { useCallback, useState, createRef } from 'react';
import request from 'superagent';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { CLOUDINARY } from '../constants';
import Button from './Button';
import PreloadedImage from './PreloadedImage';

export interface UploadedPhoto {
  id: number,
  fileName: string,
  response: {
    body: {
      url: string,
      public_id: string,
      delete_token?: string,
      [key: string]: any,
    }
    status: string,
  },
  progress: {
    percent: number,
  },
}

interface UploadedPhotoStatusProps {
	uploadedPhoto: UploadedPhoto,
	onDeletePhoto?: (publicId: string) => void,
	height?: number
	width?: number
}

function UploadedPhotoStatus({ uploadedPhoto, onDeletePhoto, width = 500, height = 500 }: UploadedPhotoStatusProps) {
	const response = uploadedPhoto.response;
	const data = response && response.body;
	const percent = Math.floor(uploadedPhoto.progress.percent);

	const deletePhoto = useCallback(() =>
		request
			.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/delete_by_token`)
			.set('Content-Type', 'application/json')
			.set('X-Requested-With', 'XMLHttpRequest')
			.send({ token: uploadedPhoto.response.body.delete_token })
			.then(() => {
				if (onDeletePhoto) {
					onDeletePhoto(data.public_id)
				}
			}),
		[uploadedPhoto, onDeletePhoto, data.public_id]
	);

	return (
		<div>
			{data?.delete_token && (<Button onPress={deletePhoto}>Delete</Button>)}
			<div className="status">
				{!response && <div>Uploading... {percent}%</div>}
				{!response && <div>In progress</div>}
				{data && data.url && (
					<PreloadedImage src={data.url} height={height} width={width} />
				)}
			</div>
			<div className="progress-bar">
				<div
					className="progress"
					role="progressbar"
					style={{ width: percent + '%' }}
				/>
			</div>
		</div>
	);
}

interface Props {
	onPhotoUploaded: ({ url, publicId }: { url: string, publicId: string }) => void;
	onPhotoRemoved?: (publicId: string) => void;
	height?: number;
	width?: number;
}

export default function PhotosUploader({ onPhotoUploaded, onPhotoRemoved, height = 500, width = 500 }: Props) {
	const titleEl = createRef();
	const [uploadedPhotos, setUploadedPhotos] = useState([] as UploadedPhoto[]);

  const onResponse = useCallback(({ body: { url, public_id: publicId } }: UploadedPhoto['response']) => {
		onPhotoUploaded({
				publicId,
				url,
		});
	}, [onPhotoUploaded]);

	const onPhotoUploadProgress = useCallback((photoId: number, fileName: string, progress: UploadedPhoto['progress']) => {
    const activeIndex = uploadedPhotos.findIndex(({ id }: UploadedPhoto) => id === photoId);

    if (activeIndex >= 0) {
			setUploadedPhotos([
				...uploadedPhotos.slice(0, activeIndex),
				{ ...uploadedPhotos[activeIndex], progress },
				...uploadedPhotos.slice(activeIndex),
			]);
		}
	}, [uploadedPhotos, setUploadedPhotos]);
	
	const onDrop = useCallback((files: any) => {
		const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/upload`;
		const title = titleEl?.current;

		for (let file of files) {
			const photoId = uuidv4();
			const fileName = file.name;
			request.post(url)
				.field('upload_preset', CLOUDINARY.UPLOAD_PRESET)
				.field('file', file)
				.field('multiple', true)
				.field('tags', title ? title : 'myphotoalbum')
				.field('context', title ? `photo=${title}` : '')
				.on('progress', (progress: any) => onPhotoUploadProgress(photoId, file.name, progress))
				.end((_error: any, response: any) => {
						setUploadedPhotos([
							...uploadedPhotos,
							{
								id: photoId,
								fileName,
								response,
								progress: {
									percent: 100,
								},
							},
						]);
						if (response) onResponse(response);
				});
		}
  }, [onResponse, setUploadedPhotos, uploadedPhotos, onPhotoUploadProgress, titleEl]);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

	return (
		<div>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				<p>{isDragActive ? 'Drop the files here ...' : 'Drag files here, or click to select files'}</p>
			</div>
			<div>
				{uploadedPhotos.map((uploadedPhoto: UploadedPhoto, index: number) => {
					return (
						<UploadedPhotoStatus
							key={index}
							uploadedPhoto={uploadedPhoto}
							onDeletePhoto={onPhotoRemoved}
						/>
					);
				})}
			</div>
		</div>
	);
}
