import { useRef } from 'react';
import { useStore } from '@nanostores/react';
import { balanceStore } from '../store/balance';
import { DEFAULT_COVER_IMAGES } from '../utils/images';

export type PostData = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  coverImage?: string;
  altText?: string;
  excerpt: string;
};

interface Props {
  posts: PostData[];
}

export default function PostsGrid({ posts }: Props) {
  const balance = useStore(balanceStore);

  const fallbacksRef = useRef<string[]>([]);
  if (fallbacksRef.current.length === 0) {
    fallbacksRef.current = posts.map(
      () => DEFAULT_COVER_IMAGES[Math.floor(Math.random() * DEFAULT_COVER_IMAGES.length)]
    );
  }

  const filtered = posts.filter(
    p => balance === 'balance' || p.tags.includes(balance)
  );

  if (filtered.length === 0) {
    return (
      <p className="text-center text-3xl pb-4 text-dimGray">No posts… yet! 😉</p>
    );
  }

  return (
    <div className="md:grid grid-cols-3 gap-x-8 items-top mx-auto pb-6">
      {filtered.map((post, i) => {
        const image = post.coverImage || fallbacksRef.current[posts.indexOf(post)] || fallbacksRef.current[i];
        return (
          <div key={post.slug} className="flex-1 pb-4">
            <a href={`/posts/${post.slug}`} className="post-preview">
              <img
                className="object-cover object-center w-full h-64 md:h-96"
                src={image}
                alt={post.altText || `Cover image for ${post.title}`}
              />
              <h2 className="font-serif font-semibold text-center text-lg pb-2 pt-2">
                {post.title}
              </h2>
              <div className="text-sm" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            </a>
          </div>
        );
      })}
    </div>
  );
}
