import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-3xl md:text-5xl font-semibold font-serif text-softBlack leading-tight md:leading-none mb-6 text-center md:text-left">
      {children}
    </h1>
  );
};

export default PostTitle;
