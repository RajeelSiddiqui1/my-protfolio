
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  githubLink?: string;
  liveLink?: string;
  technologies?: string[];
  category: string;
};

export const ProfileImage = data.profileImage;
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages as any;
