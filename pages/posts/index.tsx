import Head from 'next/head'
import Link from 'next/link'
import Container from '../../components/container'
import { getAllPosts } from '../../lib/api'
import Post from '../../types/post'
import LayoutWithContextProvider from '../../components/layout'
import PostPreview from '../../components/post-preview'
import { useContext } from 'react'
import { BalanceContext, balanceToString } from '../../context/balanceContext'
import classNames from 'classnames'

type Props = {
  allPosts: Post[]
}

const PostsComponent = ({ allPosts }: Props) => {
  const balanceString = balanceToString(useContext(BalanceContext));
  const filteredPosts = allPosts.filter((post) => post.tags.includes(balanceString) || balanceString === 'balance')

  return (
    <>
      <Head>
        <title>glittering katie | all posts </title>
      </Head>
      <Container>{filteredPosts.length > 0 ?
        <div className='md:grid grid-cols-3 items-top mx-auto pb-6'>
          {filteredPosts.map((post) => {
            return (<PostPreview post={post} />);
          })
          }
        </div> : <p className={classNames(['text-center', 'text-3xl', 'pb-4', 'text-softBlack'])}>No posts... yet! 😉</p>}
      </Container>

    </>
  )
}

const Posts = ({ allPosts }: Props) => (
  <LayoutWithContextProvider page='all-posts'>
    <PostsComponent allPosts={allPosts} />
  </LayoutWithContextProvider>
)

export const getStaticProps = async () => {
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
    'coverImage',
    'excerpt',
    'tags',
  ])

  return {
    props: { allPosts },
  }
}

export default Posts