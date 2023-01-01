import React, { useState } from 'react';
import Image from 'next/image';
import Header from '../../components/header';
import { GetStaticProps } from 'next';
import { getAllPostsSlugs, getPostBySlug } from '../../lib/sanity.client';
import { Post } from '../../typings';
import { ParsedUrlQuery } from 'querystring';
import { urlForImage } from '../../lib/sanity.image';
import PostViewer from '../../components/postViewer';
import CommentForm from '../../components/commentForm';
import Comments from '../../components/comments';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface PostProps {
  post: Post;
}

const Post = ({ post }: PostProps) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <Header />

      <Image
        className="w-full h-40 object-cover"
        src={urlForImage(post.mainImage).url()!}
        width={300}
        height={160}
        alt={post.title!}
      />

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">{post.title}</h2>
        <div className="flex items-center space-x-2">
          <Image
            className="w-10 h-10 rounded-full"
            src={urlForImage(post?.author?.image).url()!}
            width={40}
            height={40}
            alt={post.title!}
          />
          <p className="font-extralight text-sm">
            {' '}
            Blog post by{' '}
            <span className="text-green-600">{post.author?.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PostViewer post={post} />
        </div>
      </article>

      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />

      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment
          </h3>
          <p>Once it has been approved,it will appear below!</p>
        </div>
      ) : (
        <CommentForm postId={post._id} setSubmitted={setSubmitted} />
      )}

      <Comments comments={post.comments} />
    </main>
  );
};

export const getStaticPaths = async () => {
  const posts = await getAllPostsSlugs();

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default Post;
