import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import Link from 'next/link'
import { CMS_NAME } from '../lib/constants'
import Post from '../types/post'
import { ReactNode, useState } from 'react'

type Props = {
  allPosts: Post[]
}

const WORK = "1";
const BALANCE = "2";
const LIFE = "3";
type BalanceCategory = typeof WORK | typeof BALANCE | typeof LIFE;

type SocialName = "twitter" | "insta" | "github" | "linkedin" | "blog"

type Social = {
  category: BalanceCategory;
  icon: SocialName;
  url: string;
  display: ReactNode;
}

const Index = ({ allPosts }: Props) => {
  const [balance, setBalance] = useState<BalanceCategory>(BALANCE)
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  const socials: Social[] = [
    {
      category: BALANCE,
      icon: "twitter",
      url: "https://twitter.com/glitteringkatie",
      display: "twitter.com/glitteringkatie"
    }, {
      category: LIFE,
      icon: "insta",
      url: "https://www.instagram.com/glitteringkatie/",
      display: "instagram.com/glitteringkatie"
    }, {
      category: LIFE,
      icon: "insta",
      url: "https://www.instagram.com/craftsandkate/",
      display: "instagram.com/craftsandkate (art insta)"
    }, {
      category: WORK,
      icon: "github",
      url: "https://github.com/glitteringkatie",
      display: "github.com/glitteringkatie"
    }, {
      category: WORK,
      icon: "linkedin",
      url: "https://www.linkedin.com/in/katelhughes93",
      display: "linkedin.com/in/katelhughes93"
    }
  ];

  const displaySocials = socials.filter((social) => {
    if (balance === BALANCE) {
      return true
    }

    return social.category === balance || social.category === BALANCE

  });

  const icons: { [key in SocialName]: string } = {
    github: "👾",
    twitter: "🐦",
    insta: "📸",
    linkedin: "👥",
    blog: "📓"
  }

  const socialUI = (social: Social) => {
    return (
      <li>
        <Link href={social.url}><a>{icons[social.icon]} {social.display}</a></Link>
      </li>
    )
  }

  const metadata: { [key in BalanceCategory]: { bio: string, blog: Social } } = {
    [BALANCE]: {
      bio: 'Hi guys, it\'s me. Katie',
      blog: {
        category: BALANCE,
        icon: 'blog',
        url: 'blog',
        display: 'all writing'
      }
    },
    [WORK]: {
      bio: "All about work!",
      blog: {
        category: WORK,
        icon: 'blog',
        url: 'blog?type=tech-brand',
        display: 'tech writing'
      }
    },
    [LIFE]: {
      bio: "LIFE please",
      blog: {
        category: LIFE,
        icon: 'blog',
        url: 'blog?type=glittering-brand',
        display: 'glittering writing'
      }
    }
  }
  const blog = metadata[balance]

  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          Work <input type="range" min={WORK} max={LIFE} defaultValue={balance} onChange={(event) => setBalance(event.target.value as BalanceCategory)} /> Life
          <div>{blog.bio}</div>
          <ul>
            {displaySocials.map(socialUI)}
            {socialUI(blog.blog)}
          </ul>
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
