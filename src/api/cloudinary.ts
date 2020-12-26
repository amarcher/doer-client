import request from 'superagent';
import { v4 as uuidv4 } from 'uuid';
import { CLOUDINARY, CLOUDINARY_DELETE_URL, CLOUDINARY_UPLOAD_URL } from '../constants';

export interface UploadedPhotoResponse {
	body: {
		url: string
		public_id: string
		delete_token?: string
		[key: string]: any
	}
	status: string
}

export interface OnPhotoUploadProgressInputs {
  photoId: string
  percent: number
  response?: UploadedPhotoResponse
}

export function deletePhoto(token: string) {
	return request
		.post(CLOUDINARY_DELETE_URL)
		.set('Content-Type', 'application/json')
		.set('X-Requested-With', 'XMLHttpRequest')
		.send({ token });
}

export function uploadPhoto(
  file: File,
  onPhotoUploadProgress: (inputs: OnPhotoUploadProgressInputs) => void
) {
  const photoId = uuidv4();
  const { name } = file;

  return request.post(CLOUDINARY_UPLOAD_URL)
    .field('upload_preset', CLOUDINARY.UPLOAD_PRESET)
    .field('file', file)
    .field('multiple', true)
    /* .field('return_delete_token', true) // TODO: return delete token when using signed image upload */ 
    .field('tags', name ? name : 'myphotoalbum')
    .field('context', name ? `photo=${name}` : '')
    .on('progress', ({ percent = 0 }: { percent: number }) => onPhotoUploadProgress({ photoId, percent }))
    .end((_error: any, response: UploadedPhotoResponse) => {
      if (response) {
        onPhotoUploadProgress({ photoId, percent: 100, response });
      }
    });
  }
