import { FaGithub, FaInstagram } from 'react-icons/fa';

export default function SocialLinks() {
  return (
    <div className="flex justify-center pb-3">
      <a
        href="https://instagram.com/glitteringkatie"
        className="flex items-center mx-4 text-pine hover:text-cream transition-colors"
        aria-label="@glitteringkatie on instagram">
        <FaInstagram className="text-3xl" />
      </a>
      <a
        href="https://instagram.com/heykatiehues"
        className="flex items-center mx-4 text-pine hover:text-cream transition-colors"
        aria-label="@heykatiehues on instagram">
        <FaInstagram className="text-3xl" />
      </a>
      <a
        href="https://github.com/glitteringkatie"
        className="flex items-center mx-4 text-pine hover:text-cream transition-colors"
        aria-label="@glitteringkatie on github">
        <FaGithub className="text-3xl" />
      </a>
    </div>
  );
}
