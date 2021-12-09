type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  excerpt: string
  tags: string[]
  ogImage: {
    url: string
  }
  content: string
  canonical?: string
}

export default PostType
