import { CarouselImage } from '../components/Carousel';
import { Images } from '../components/ImageUploader';
import { PostFragment_images } from '../fragments/__generated__/PostFragment';
import { GetProject_project_projectExecutions_images as ProjectExecutionImage } from '../queries/__generated__/GetProject';
import { GetUser_user_profilePic } from '../queries/__generated__/GetUser';

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

export function getImageUploadInputsFromImages(
  images?: (PostFragment_images | null)[]
) {
  if (!images) {
    return {} as Images;
  }

  return images?.reduce((imageUploadInputs: Images, image) => {
    if (image) {
      const {
        caption,
        image: { __typename, id, ...img },
      } = image;
      imageUploadInputs[id] = {
        ...img,
        caption,
      };
    }
    return imageUploadInputs;
  }, {} as Images);
}

export function getImageUploadInputsFromProfilePic(
  profilePic?: GetUser_user_profilePic | null
) {
  if (!profilePic) {
    return {} as Images;
  }

  const { __typename, id, ...image } = profilePic;

  return { [image.publicId || id]: image } as Images;
}
