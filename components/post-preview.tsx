import { useRef } from 'react'
import Link from 'next/link'
import Post from '../types/post'

type Props = {
  post: Post
}

const defaultImages: string[] = [
  'https://images.unsplash.com/photo-1583311578285-9d6e88b29358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  'https://images.unsplash.com/photo-1571845413709-ba4ddc85eb12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1166&q=80',
  'https://images.unsplash.com/photo-1625061661591-14d9e67e1ee7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
  'https://images.unsplash.com/photo-1554921027-b91f0beeb07d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1576669803361-2f85b619711b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
  'https://images.unsplash.com/photo-1574027542183-77efe00ca49f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80',
]

const PostPreview = ({ post }: Props) => {
  const { current: randomImage } = useRef(defaultImages[Math.floor(Math.random() * defaultImages.length)]);
  const coverImage = post.coverImage || randomImage
  return (
    <div className='flex-1 pr-8 last:pr-0 pb-4'>
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