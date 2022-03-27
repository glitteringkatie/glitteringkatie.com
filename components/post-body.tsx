import Image from 'next/image';
import markdownStyles from './markdown-styles.module.css';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

type Props = {
  mdxSource: MDXRemoteSerializeResult;
};

const components = {
  img: (props: any) => (
    // height and width are part of the props, so they get automatically passed here with {...props}
    <Image {...props} layout="responsive" loading="lazy" />
  ),
};

const PostBody = ({ mdxSource }: Props) => {
  return (
    <div className={`max-w-2xl mx-auto ${markdownStyles['markdown']}`}>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
};

export default PostBody;
