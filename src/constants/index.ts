export const APP_NAME = 'Doer';
export const ROOT_ELEMENT = 'root';
export const LOCAL_STORAGE_PREFIX = '__doer__';

export enum PRIVILEGES {
  USER = 'user',
  PROJECT_ADMIN = 'projectAdmin',
  ADMIN = 'admin',
}

export const CLOUDINARY = {
  CLOUD_NAME: 'dvpj3g082',
  UPLOAD_PRESET: 'oq1lpyoe',
  MAX_SIZE: 10485760,
};

const CLOUDINARY_BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}`;
export const CLOUDINARY_UPLOAD_URL = `${CLOUDINARY_BASE_URL}/upload`;
export const CLOUDINARY_DELETE_URL = `${CLOUDINARY_BASE_URL}/delete_by_token`;

export const GOOGLE = {
  CLIENT_ID:
    '265278411016-t8k5660som1regreqb8p2rrd2ctlee79.apps.googleusercontent.com',
};

export const GRAPHQL_ENDPOINT = {
  PROD: 'https://capxun.com/graphql',
  DEV: 'http://localhost:4000/graphql',
  DEPRECATED_PROD: 'http://52.13.54.231:4000/graphql',
};

export const HIDE_NAV_AFTER_SCROLL_PX = 100;
