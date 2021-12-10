import {useRef} from 'react'
import Link from 'next/link'
import Post from '../types/post'
import { getDefaultImage } from './cover-image'

type Props = {
  post: Post
  headerLevel: string
}

const getHeader = (headerLevel: string, title: string) => {
  switch (headerLevel) {
    case 'h2': return <h2 className='font-serif font-semibold text-center text-lg pb-2 pt-2'>{title}</h2>
    case 'h3':
    default: return <h3 className='font-serif font-semibold text-center text-lg pb-2 pt-2'>{title}</h3>
  }
}

const PostPreview = ({ post, headerLevel = 'h3' }: Props) => {
  const { current: randomImage } = useRef(getDefaultImage());
  const coverImage = post.coverImage || randomImage;
  const altText = post.altText || `Cover image for ${post.title}`
  return (
    <div className='flex-1 pb-4'>
      <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
        <a className='post-preview'>
          <img className='object-cover object-center w-full h-64 md:h-96' src={coverImage} alt={altText} />
          {getHeader(headerLevel, post.title)}
          <div
            className='text-sm'
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        </a>
      </Link>
    </div>)
}

export default PostPreview;