import React from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.css';

import PreloadedImage from './PreloadedImage';

type CarouselProps = {
  children: React.ReactNode;
  width?: number;
  height?: number;
};

function Carousel({ children, height = 500, width = 500 }: CarouselProps) {
  return (
    <CarouselProvider
      naturalSlideWidth={width}
      naturalSlideHeight={height}
      totalSlides={React.Children.count(children)}
    >
      <Slider>
        {React.Children.map(children, (child, index) => (
          <Slide index={index} key={index}>
            {child}
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
}

type CarouselContainerProps = {
  height?: number;
  width?: number;
  images: {
    caption?: string;
    src: string;
    key: string | number;
  }[];
};

export default function CarouselContainer({
  height = 500,
  images,
  width = 500,
}: CarouselContainerProps) {
  return (
    <Carousel height={height} width={width}>
      {images.map(({ caption, src, key }) => (
        <div key={key} className="Carousel__image">
          <PreloadedImage src={src} height={height} width={width} />
          {caption && <div className="Carousel__caption">{caption}</div>}
        </div>
      ))}
    </Carousel>
  );
}
