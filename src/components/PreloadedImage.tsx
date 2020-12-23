import React, { useState, useRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import './PreloadedImage.css';

type Props = {
  alt?: string;
  className?: string;
  imageClassName?: string;
  onReady?: (src: string) => void;
  src: string;
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
  src,
  useImg = false,
  width = '',
}: Props) {
  const preloader = useRef(new Image());
  preloader.current.src = src;
  const [loaded, setLoaded] = useState(preloader.current.complete)

  const onLoad = useCallback(() => {
    setLoaded(true);
    onReady(src);
  }, [src, onReady, setLoaded])

  preloader.current.onload = onLoad;

  const containerStyle = useMemo(() => ({
    height,
    width,
  }), [height, width]);

  const imgCoverStyle = useMemo(() => ({
    borderRadius,
    height: useImg ? height : undefined,
    width: useImg ? width : undefined,
  }), [borderRadius, height, useImg, width]);

  const imgStyle = useMemo(() => ({
    ...imgCoverStyle,
    backgroundImage: useImg ? undefined : `url(${src})`,
  }), [imgCoverStyle, src, useImg]);

  const containerClass = classNames('preloaded-image__container', {
    'preloaded-image__preloading': !loaded,
    [className]: !!className,
  });

  const imgClass = classNames(`preloaded-image${useImg ? '__img' : ''}`, {
    [imageClassName]: !!imageClassName,
  });

  if (useImg) {
    return (
      <div className={containerClass} style={containerStyle}>
        <img
          className={imgClass}
          style={imgStyle}
          alt={alt}
          src={src}
          height={height}
          width={width}
        />
        <div className="preloaded-image__cover" style={imgCoverStyle} />
      </div>
    );
  }

  return (
    <div
      className={containerClass}
      style={containerStyle}
    >
      <div
        className={imgClass}
        style={imgStyle}
        role="img"
        aria-label={alt}
      />
      <div className="preloaded-image__cover" style={imgCoverStyle} />
    </div>
  );
}
