import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import markdownToHtml from './markdownToHtml'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

const truncate = (str: string, max: number, suffix: string) => (
  str.length < max
    ? str
    : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`);


export async function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  await Promise.all(fields.map(async (field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (field === 'excerpt') {
      const excerpt = items[field] || truncate(content, 240, '...');
      const html = await markdownToHtml(excerpt || '')
      items.excerpt = html
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  }));

  return items
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = await Promise.all(slugs
    .map(async (slug) => await getPostBySlug(slug, fields)))
  console.log(posts);
  console.log(typeof posts);
  // sort posts by date in descending order
  const sortedPosts = posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return sortedPosts
}
