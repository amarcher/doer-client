import React from 'react';
import { usePreview } from 'react-dnd-preview';
import isTouchDevice from '../utils/touchDetection';
import ImageUploadThumbnail, {
  type as imageUploadThumbnailType,
} from './ImageUploadThumbnail';

export default function DragPreview() {
  const { display, itemType, item, style } = usePreview();

  if (display && isTouchDevice() && itemType === imageUploadThumbnailType) {
    return (
      <div style={style}>
        <ImageUploadThumbnail
          src={item.src}
          id={item.id}
          percent={100}
          order={item.order}
          isPreview
          width={item.width}
          height={item.height}
        />
      </div>
    );
  }

  return null;
}
