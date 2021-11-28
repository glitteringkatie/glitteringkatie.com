import Container from '../components/container'
import Intro from '../components/intro'
import LayoutWithContextProvider from '../components/layout'
import GlitteringKatieMark from '../components/glitteringkatie-mark'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { CMS_NAME } from '../lib/constants'
import Post from '../types/post'
import { ReactNode, useContext, useState } from 'react'
import workPic from '../public/assets/home/work-profile.png'
import lifePic from '../public/assets/home/life-profile.png'
import balancePic from '../public/assets/home/balance-profile.png'
import classNames from 'classnames'
import { WORK, LIFE, BALANCE, BalanceCategory, BalanceContext } from '../context/balanceContext'

type Props = {
  allPosts: Post[]
}

type SocialName = "twitter" | "insta" | "github" | "linkedin" | "blog"

type Social = {
  category: BalanceCategory;
  icon: SocialName;
  url: string;
  display: ReactNode;
}

const IndexComponent = ({ allPosts }: Props) => {
  const balanceValue = useContext(BalanceContext)
  console.log(balanceValue)

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
    if (balanceValue === BALANCE) {
      return true
    }

    return social.category === balanceValue || social.category === BALANCE

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
      <li className='pt-2'>
        <Link href={social.url}><a>{icons[social.icon]} {social.display}</a></Link>
      </li>
    )
  }

  const metadata: { [key in BalanceCategory]: { bio: ReactNode, findMe: string, profilePic: StaticImageData, blog: Social } } = {
    [BALANCE]: {
      bio: (<><p>Hi, I'm Katie! I'm a software engineer living in Portland, OR, who
        loves interior design, making craft cocktails, and flying through the air
        at my local circus school. Finding a balance between a professional and
        personal website is just as hard (and rewarding) as finding that perfect
        work/life balance.</p>

        <p>On this site and in this blog you'll find me—the whole me. That means
          posts about Next.js or parsers side by side with posts about IKEA flips
          and vintage finds. I hope you'll have fun here and find something new.
          Happy reading!</p>

        <p>P.S. If you haven’t yet, try the work/life balance slider above!</p></>),
      profilePic: balancePic,
      findMe: 'say hi!',
      blog: {
        category: BALANCE,
        icon: 'blog',
        url: 'blog',
        display: 'all writing'
      }
    },
    [WORK]: {
      bio: (<><p>Hi, I'm Katie! I'm a senior software engineer at Elastic, working
        remotely in Oregon.I've been working in software engineering for five
        years now, majored in computer science at Oregon State(go Beavs!), and
        started programming junior year of high school with Pascal.</p >

        <p>I love thinking through frontend architecture; I find it fun to work
          through the data flow puzzle.I also value collaboration.I love pairing
          with other engineers and working with designers or docs writers to see and
          understand that bigger picture.</p></>),
      profilePic: workPic,
      findMe: 'contact me!',
      blog: {
        category: WORK,
        icon: 'blog',
        url: 'blog?type=tech-brand',
        display: 'tech writing'
      }
    },
    [LIFE]: {
      bio: (<><p>Hi, I'm Katie! I'm an Oregonian with a crafty streak who grew up on
        (too much?) HGTV and loves a good gin & tonic. I live in an apartment in
        Portland with my cat, Erwin Schrödinger, who might be a panther. We have
        fun here!</p>

        <p>I've found a lot of my hobbies (interior design, cocktail making, aerial)
          are all puzzles to find the intersection of functionality and beauty. Who
          wants a tasty but ugly cocktail? What's the point of a beautiful couch if
          it isn't comfy enough to take a nap? How do you look graceful while
          tangled up in silks? That intersection is where I love to play.</p></>),
      profilePic: lifePic,
      findMe: 'swing by!',
      blog: {
        category: LIFE,
        icon: 'blog',
        url: 'blog?type=glittering-brand',
        display: 'glittering writing'
      }
    }
  }
  const blog = metadata[balanceValue]

  const headerStyles = classNames(['text-center', 'uppercase', 'font-light', 'text-3xl', 'tracking-widest', 'pb-4'])

  return (
    <>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Container>
        <div className="flex flex-col md:flex-row max-w-4xl mx-auto items-center pb-20">
          <div className="flex-1">
            <h2 className={headerStyles}>About me</h2>
            {blog.bio}
          </div>
          <div className="flex-1">
            {blog.profilePic ? <Image src={blog.profilePic} /> : null}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pb-20">
          <h2 className={headerStyles}>My Latest Posts</h2>
          <button className='bg-pine text-cream pt-4 px-6 pb-3 rounded-full text-xl font-serif font-semibold lowercase'>browse all posts</button>

        </div>
        <div className='mx-auto items-center p-16 bg-blob bg-stretch max-w-4xl bg-center bg-no-repeat text-cream text-center'>
          <h2 className='lowercase font-serif font-semibold text-6xl pb-4'> {blog.findMe} </h2>
          <ul className='text-xl pb-4'>
            {displaySocials.map(socialUI)}
          </ul>
        </div>
      </Container>
    </>
  )
}

const Index = ({ allPosts }: Props) => (
  <LayoutWithContextProvider>
    <IndexComponent allPosts={allPosts} />
  </LayoutWithContextProvider>
)

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
