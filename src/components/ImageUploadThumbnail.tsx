import React from 'react';

import Button from './Button';
import PreloadedImage from './PreloadedImage';

import './ImageUploadThumbnail.css';

interface Props {
  id: string;
  onDeletePhoto?: (publicId: string) => void;
  percent: number;
  src?: string;
  height?: number;
  width?: number;
}

export default function ImageUploadThumbnail({
  id,
  percent,
  src = '',
  onDeletePhoto,
  width = 500,
  height = 500,
}: Props) {
  return (
    <div className="ImageUploadThumbnail">
      {onDeletePhoto && (
        <Button
          preventDefault
          onPress={() => onDeletePhoto(id)}
          className="ImageUploadThumbnail__button"
        >
          x
        </Button>
      )}
      <PreloadedImage src={src} height={height} width={width} />
      {percent && percent < 100 && (
        <div className="ImageUploadThumbnail__progress_bar">
          <div
            className="ImageUploadThumbnail__progress"
            role="progressbar"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </div>
  );
}
