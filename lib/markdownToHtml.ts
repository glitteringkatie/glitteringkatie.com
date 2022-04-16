import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import rehypeImageSize from 'rehype-img-size';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .use(rehypeImageSize, { dir: 'public' })
    .process(markdown);

  return result.toString();
}
