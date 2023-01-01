import { groq } from 'next-sanity';

const postFields = groq`
  _id,
  title,
  description,
  slug,
  mainImage,
  _createdAt,
  "slug": slug.current,
  "author": author->{name, image},
`;

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current`;

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
  body,
  'comments': *[
    _type == 'comment' && 
    post._ref == ^._id &&
    approved == true
  ],
}`;
