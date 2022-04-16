import Link from 'next/link';
import cn from 'classnames';
import Default1 from '../public/assets/blog/default1.jpeg';
import Default2 from '../public/assets/blog/default2.jpeg';
import Default3 from '../public/assets/blog/default3.jpeg';
import Default4 from '../public/assets/blog/default4.jpeg';
import Default5 from '../public/assets/blog/default5.jpeg';
import Default6 from '../public/assets/blog/default6.jpeg';
import Default7 from '../public/assets/blog/default7.jpeg';
import Default8 from '../public/assets/blog/default8.jpeg';
import Default9 from '../public/assets/blog/default9.jpeg';
import Default10 from '../public/assets/blog/default10.jpeg';
import Default11 from '../public/assets/blog/default11.jpeg';
import Default12 from '../public/assets/blog/default12.jpeg';
import Default13 from '../public/assets/blog/default13.jpeg';
import Default14 from '../public/assets/blog/default14.jpeg';

type Props = {
  title: string;
  src: string;
  slug?: string;
  position?: string;
  altText?: string;
};

const defaultCoverImages: string[] = [
  Default1,
  Default2,
  Default3,
  Default4,
  Default5,
  Default6,
  Default7,
  Default8,
  Default9,
  Default10,
  Default11,
  Default12,
  Default13,
  Default14,
];

export const getDefaultImage = () => {
  return defaultCoverImages[
    Math.floor(Math.random() * defaultCoverImages.length)
  ];
};

const CoverImage = ({ title, src, slug, position, altText }: Props) => {
  const randomImage = getDefaultImage();
  const objPosition = position === 'top' ? 'object-top' : 'object-center';
  const image = (
    <img
      src={src ?? randomImage}
      alt={altText || `Cover Image for ${title}`}
      className={cn(
        'object-cover object-center w-full h-64 md:h-96',
        objPosition,
        {
          'hover:shadow-medium transition-shadow duration-200': slug,
        }
      )}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
