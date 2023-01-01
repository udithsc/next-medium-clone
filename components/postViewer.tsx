import { PortableText } from '@portabletext/react';
import React from 'react';
import urlBuilder from '@sanity/image-url';
import { getImageDimensions } from '@sanity/asset-utils';
import { Post } from '../typings';

interface PostProps {
  post: Post;
}

const SampleImageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <img
      src={urlBuilder()
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  );
};

function PostViewer({ post }: PostProps) {
  return (
    <PortableText
      value={post.body}
      components={{
        block: {
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold my-5">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold my-5">{children}</h2>
          ),
        },
        listItem: {
          bullet: ({ children }) => (
            <li className="ml-4 list-disc">{children}</li>
          ),
        },
        marks: {
          link: ({ value, children }) => {
            const target = (value?.href || '').startsWith('http')
              ? '_blank'
              : undefined;

            return (
              <a
                href={value?.href}
                target={target}
                rel={target === '_blank' && 'noindex nofollow'}
                className="text-blue-500 hover:underline"
              >
                {children}
              </a>
            );
          },
        },
        types: {
          image: SampleImageComponent,
        },
      }}
    />
  );
}

export default PostViewer;
