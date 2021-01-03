import { CarouselImage } from '../components/Carousel';
import { GetProject_project_projectExecutions_images as ProjectExecutionImage } from '../queries/__generated__/GetProject';

function getImgUrl(hostedUrl?: string) {
  return hostedUrl && !hostedUrl.includes('s3:')
    ? hostedUrl
    : 'https://cataas.com/cat/gif';
}

export function getImagesForCarousel(
  images?: (ProjectExecutionImage | null)[] | null
): CarouselImage[] {
  return (
    images?.map((img) => {
      const { image, caption } = img || {};
      return {
        key: image?.id || '',
        src: getImgUrl(image?.hostedUrl),
        caption,
      };
    }) || []
  );
}
