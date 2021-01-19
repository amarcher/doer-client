import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';

import Button from './Button';
import PreloadedImage from './PreloadedImage';

import './ImageUploadThumbnail.css';

interface Props {
  id: string;
  order?: number;
  onDeletePhoto?: (publicId: string) => void;
  onPhotoReordered?: (publicId: string, nextOrder: number) => void;
  percent: number;
  src?: string;
  height?: number;
  width?: number;
  className?: string;
  isPreview?: boolean;
}

export const type = 'ImageUploadThumbnail';

export default function ImageUploadThumbnail({
  id,
  isPreview,
  order,
  percent,
  src = '',
  onDeletePhoto,
  onPhotoReordered,
  width = 300,
  height = 300,
  className,
}: Props) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item: { type: string; order: number; id: string }) {
      if (!ref.current || item.order === order) {
        return;
      }

      if (onPhotoReordered && order != null) {
        onPhotoReordered(item.id, order);
        /*
          Update the index for dragged item directly to avoid flickering
          when the image was half dragged into the next
        */
        item.order = order;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type, id, order, src, width, height },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={classNames('ImageUploadThumbnail', {
        ImageUploadThumbnail__is_dragging: isDragging,
        ImageUploadThumbnail__is_preview: isPreview,
      })}
      ref={onPhotoReordered ? ref : undefined}
    >
      {onDeletePhoto && (
        <Button
          preventDefault
          onPress={() => onDeletePhoto(id)}
          className="ImageUploadThumbnail__button"
          title="Remove"
        >
          x
        </Button>
      )}
      {order != null && (
        <div className="ImageUploadThumbnail__order">{order}</div>
      )}
      <PreloadedImage
        src={src}
        height={height}
        width={width}
        className={className}
      />
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
