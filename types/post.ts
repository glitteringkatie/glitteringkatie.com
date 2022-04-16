import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  altText: string;
  excerpt: string;
  tags: string[];
  ogImage: {
    url: string;
  };
  content: string;
  canonical?: string;
  mdxSource: MDXRemoteSerializeResult;
};

export default PostType;
