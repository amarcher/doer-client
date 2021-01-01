import React from 'react';
import { CarouselProvider, DotGroup, Slider, Slide } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.css';

import PreloadedImage from './PreloadedImage';

type CarouselProps = {
  children: React.ReactNode;
  width?: number;
  height?: number;
};

function Carousel({ children, height = 300, width = 300 }: CarouselProps) {
  const totalSlides = React.Children.count(children);

  return (
    <CarouselProvider
      naturalSlideWidth={width}
      naturalSlideHeight={height}
      totalSlides={totalSlides}
    >
      {totalSlides > 1 && <DotGroup />}
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

export interface CarouselImage {
  caption?: string | null;
  src: string;
  key: string | number;
}

type CarouselContainerProps = {
  height?: number;
  width?: number;
  images: CarouselImage[];
};

export default function CarouselContainer({
  height = 300,
  images,
  width = 300,
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
