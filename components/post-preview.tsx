import {useRef} from 'react'
import Link from 'next/link'
import Post from '../types/post'
import { getDefaultImage } from './cover-image'

type Props = {
  post: Post
}

const PostPreview = ({ post }: Props) => {
  const { current: randomImage } = useRef(getDefaultImage());
  const coverImage = post.coverImage || randomImage
  return (
    <div className='flex-1 pb-4'>
      <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
        <a className='post-preview'>
          <img className='object-cover object-center w-full h-64 md:h-96' src={coverImage} />
          <h3 className='font-serif font-semibold text-center text-lg pb-2 pt-2'>{post.title}</h3>
          <div
            className='text-sm'
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        </a>
      </Link>
    </div>)
}

export default PostPreview;