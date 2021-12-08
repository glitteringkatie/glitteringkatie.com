import DateFormatter from './date-formatter'
import PostTitle from './post-title'

type Props = {
  title: string
  coverImage: string
  date: string
}

const PostHeader = ({ title, coverImage, date }: Props) => {
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
