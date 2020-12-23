import React, { useMemo } from 'react';
import classNames from 'classnames';

import './ImageUploader.css';

type Props = {
  alt?: string;
  className?: string;
  imageClassName?: string;
  onReady?: (src: string) => void;
  height: number | string;
  width: number | string;
  borderRadius?: number | string;
  useImg?: boolean;
};

export default function PreloadedImage({
  alt = '',
  borderRadius = 10,
  className = '',
  height = '',
  imageClassName = '',
  onReady = () => {},
  useImg = false,
  width = '',
}: Props) {
  const containerStyle = useMemo(() => ({
    height,
    width,
  }), [height, width]);

  const imgCoverStyle = useMemo(() => ({
    borderRadius,
    height: useImg ? height : undefined,
    width: useImg ? width : undefined,
  }), [borderRadius, height, useImg, width]);

  const containerClass = classNames(
    'preloaded-image__container',
    'preloaded-image__preloading',
    {
      [className]: !!className,
    }
  );

  if (useImg) {
    return (
      <div className={containerClass} style={containerStyle}>
        <div className="preloaded-image__cover" style={imgCoverStyle} />
      </div>
    );
  }

  return (
    <div
      className={containerClass}
      style={containerStyle}
    >
      <div className="preloaded-image__cover" style={imgCoverStyle} />
    </div>
  );
}
