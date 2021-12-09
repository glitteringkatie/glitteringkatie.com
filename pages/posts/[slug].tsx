import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  post: PostType
  newer: PostType
  older: PostType
}

const Post = ({ post, newer, older }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const canonicalTag = post.canonical ? <link rel="canonical" href={post.canonical} /> : null;
  const title = `${post.title} | glittering katie`

  return (
    <Layout page='post' post={post}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {title}
                </title>
                <meta property="og:title" content={title} />
                <meta property="og:image" content={post.ogImage?.url || post.coverImage} />
                {canonicalTag}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
              />
              <PostBody content={post.content} />
            </article>
            <div className='flex max-w-3xl mx-auto'>
              <div className='flex-1 flex justify-start' >
              {newer ? <Link href={newer.slug}>
                <a className='flex text-fern hover:text-pine'>
                <FontAwesomeIcon icon={faArrowLeft} className='h-8 mr-3' />
                  <div className='font-serif font-semibold'><div className='text-3xl'>newer</div>
                  <div>{newer.title}</div>
                  </div>
                </a>
              </Link> : null}
              </div>
              <div className='flex-1 flex justify-end' >
              {older ? <Link href={older.slug}>
                <a className='flex text-fern hover:text-pine'>
                  <div className='font-serif font-semibold text-right'><div className='text-3xl'>older</div>
                  <div>{older.title}</div>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className='h-8 ml-3' />
                </a>
              </Link> : null}
              </div>
            </div>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'coverImage',
    'coverPosition',
    'canonical',
    'excerpt'
  ])
  const content = await markdownToHtml(post.content || '')
  const posts = await getAllPosts(['slug', 'title', 'date'])
  const currentIndex = posts.findIndex(post => post.slug === params.slug)
  const older = posts[currentIndex + 1] ?? null;
  const newer = posts[currentIndex - 1] ?? null;

  return {
    props: {
      post: {
        ...post,
        content,
      },
      newer,
      older,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug', 'date'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
