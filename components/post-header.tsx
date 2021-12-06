import Avatar from './avatar'
import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import Author from '../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
}

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <div className="max-w-3xl mx-auto">
      <PostTitle>{title}</PostTitle>
      <div className="max-w-2xl mx-auto mb-12 text-lg">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostHeader
