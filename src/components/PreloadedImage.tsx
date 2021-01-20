import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
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

function isVideo(src?: string) {
  return src?.includes('/video/');
}

export default function PreloadedImage({
  alt = '',
  borderRadius = 10,
  className = '',
  height = '',
  imageClassName = '',
  onReady,
  src,
  useImg = false,
  width = '',
}: Props) {
  const preloader = useRef(new Image());
  preloader.current.referrerPolicy = 'no-referrer';
  preloader.current.src = src;
  const [loaded, setLoaded] = useState(preloader.current.complete);

  const onLoad = useCallback(() => {
    setLoaded(true);
    if (onReady) onReady(src);
    if (preloader.current.onload) {
      preloader.current.onload = null;
    }
  }, [src, onReady]);

  preloader.current.onload = onLoad;

  useEffect(() => {
    const { current } = preloader;
    if (src) {
      current.src = src;
      setLoaded(current.complete);
    }

    return () => {
      if (current?.onload) {
        current.onload = null;
      }
    };
  }, [src]);

  const containerStyle = useMemo(
    () => ({
      height,
      width,
      display: useImg ? 'flex' : 'block',
      borderRadius: isVideo(src) ? borderRadius : undefined,
    }),
    [height, width, useImg, borderRadius, src]
  );

  const imgCoverStyle = useMemo(
    () => ({
      borderRadius,
      height: useImg ? height : undefined,
      width: useImg ? width : undefined,
    }),
    [borderRadius, height, useImg, width]
  );

  const imgStyle = useMemo(
    () => ({
      ...imgCoverStyle,
      backgroundImage: useImg ? undefined : `url(${src})`,
    }),
    [imgCoverStyle, src, useImg]
  );

  const containerClass = classNames('preloaded-image__container', {
    'preloaded-image__preloading': !loaded,
    [className]: !!className,
  });

  const imgClass = classNames(`preloaded-image${useImg ? '__img' : ''}`, {
    [imageClassName]: !!imageClassName,
    'preloaded-image__video': isVideo(src),
  });

  if (isVideo(src)) {
    return (
      <div className={containerClass} style={containerStyle}>
        <video
          playsInline
          autoPlay
          muted
          loop
          controls
          height={height}
          width={width}
          title={alt}
          className={imgClass}
        >
          <source src={src} />
        </video>
      </div>
    );
  }

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
          referrerPolicy="no-referrer"
        />
        <div className="preloaded-image__cover" style={imgCoverStyle} />
      </div>
    );
  }

  return (
    <div className={containerClass} style={containerStyle}>
      <div className={imgClass} style={imgStyle} role="img" aria-label={alt} />
      <div className="preloaded-image__cover" style={imgCoverStyle} />
    </div>
  );
}
