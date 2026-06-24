import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sorted = posts.sort((a, b) => b.data.date.localeCompare(a.data.date));

  return rss({
    title: 'glittering katie',
    description: 'A tech and lifestyle blog by Katie Hughes',
    site: context.site,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      link: `/posts/${post.slug}/`,
    })),
  });
}
