import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './sanity.api';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId!,
  dataset: dataset!,
});

export const urlForImage = (source: string) =>
  imageBuilder.image(source).auto('format').fit('max');
