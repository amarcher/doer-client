import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
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

function PreloadedImage({
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
  const [loaded, setLoaded] = useState(false)
  const preloader = useRef(new Image());

  const onLoad = useCallback(() => {
    setLoaded(true);
    onReady(src);
  }, [onReady, setLoaded])

  useEffect(() => {
    preloader.current.onload = onLoad;
    preloader.current.src = src;

    return () => {
      preloader.current.onload = null;
    }
  }, []);

  const containerStyle = useMemo(() => ({
    height,
    width,
  }), [borderRadius, height, width]);

  const imgStyle = useMemo(() => ({
    borderRadius,
    backgroundImage: useImg ? undefined : `url(${src})`,
    height,
    width,
  }), [borderRadius, height, width]);

  const containerClass = classNames('preloaded-image__container', {
    [className]: !!className,
  });

  const imgClass = classNames(`preloaded-image${useImg ? '__img' : ''}`, {
    'preloaded-image__preloading': !loaded,
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
      </div>
    );
  }

  return (
    <div
      className={containerClass}
      style={{
        height: height,
        width: width,
      }}
    >
      <div
        className={imgClass}
        style={imgStyle}
        role="img"
        aria-label={alt}
      />
    </div>
  );
}

export default PreloadedImage;
