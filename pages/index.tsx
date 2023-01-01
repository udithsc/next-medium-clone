import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/header';
import { Post } from '../typings';
import { getAllPosts } from '../lib/sanity.client';
import Link from 'next/link';
import { urlForImage } from '../lib/sanity.image';

interface HomePageProps {
  posts: Post[];
}

const Home: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to write read and connect
          </h1>
          <h2>
            its easy and free to post yout thinking on any topic and connect
            with millions of readers
          </h2>
        </div>
        <div className="hidden md:inline-flex h-32 lg:h-full mr-5">
          <Image
            src="/medium-logo.png"
            alt="medium-logo"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <Image
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={
                  post.mainImage?.asset?._ref
                    ? urlForImage(post.mainImage).url()
                    : 'https://unsplash.com/photos/aOC7TSLb1o8'
                }
                alt=""
                width={300}
                height={240}
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} By {post.author?.name}
                  </p>
                </div>
                <Image
                  className="h-12 w-12 rounded-full"
                  src={urlForImage(post?.author?.image).url()!}
                  alt=""
                  width={48}
                  height={48}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
