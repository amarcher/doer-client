import React from 'react';
import { usePreview } from 'react-dnd-preview';
import ImageUploadThumbnail, {
  type as imageUploadThumbnailType,
} from './ImageUploadThumbnail';

export default function DragPreview() {
  const { display, itemType, item } = usePreview();

  if (display && itemType === imageUploadThumbnailType) {
    return (
      <ImageUploadThumbnail
        src={item.src}
        id={item.id}
        percent={100}
        order={item.order}
        className="ImageUploadThumbnail__is_dragging"
      />
    );
  }

  return null;
}
