import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(html)
    .use(() => {
      return function transformer(tree) {
        console.log(tree);
      }
    }).process(markdown)

  console.log(result);
  return result.toString()
}
