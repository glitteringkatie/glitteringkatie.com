import DateFormatter from './date-formatter';
import PostTitle from './post-title';

type Props = {
  title: string;
  date: string;
};

const PostHeader = ({ title, date }: Props) => {
  return (
    <header className="max-w-3xl mx-auto">
      <PostTitle>{title}</PostTitle>
      <div className="max-w-2xl mx-auto mb-12 text-lg">
        <DateFormatter dateString={date} />
      </div>
    </header>
  );
};

export default PostHeader;
