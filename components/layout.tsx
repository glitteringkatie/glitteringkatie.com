import { useState, useRef } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import CoverImage from './cover-image'
import Meta from './meta'
import GKLogo from '../public/glitteringkatie.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import { WORK, LIFE, BALANCE, BalanceCategory, BalanceContext } from '../context/balanceContext'

type Props = {
  page?: string
  children: React.ReactNode
  post?: { coverImage: string, title: string, coverPosition?: string, canonical?: string }
}

const Layout = ({ page = 'home', children, post }: Props) => {
  const [balanceValue, setBalanceValue] = useState<BalanceCategory>(BALANCE);
  const workLifeLabelClasses = classNames(['text-warmBlack', 'text-4xl', 'font-serif', 'italic']);

  const backgroundSize: { [key in BalanceCategory]: string } = {
    [WORK]: "0% 100%",
    [BALANCE]: "50% 100%",
    [LIFE]: "100% 100%",
  }

  const padding = page === 'home'
    ? "py-8 md:pt-16"
    : "py-8"

  const today = new Date()
  let emojis = FUN
  if (today.getMonth() >= 10) {
    // zero indexed months, 10 == 11 == NOV
    emojis = emojis.concat(CHRISTMAS)
  } else if (today.getMonth() >= 8) {
    // 8 == 9 == SEP
    emojis = emojis.concat(HALLOWEEN)
  }
  const emojiIndex = useRef(Math.floor(Math.random() * emojis.length))

  const socialFooter = page !== 'home' ?
    <div className='flex justify-center pb-3'>
      <Link href='https://twitter.com/glitteringkatie'><a className='flex items-center mx-4 text-pine hover:text-cream transition-colors'>
        <FontAwesomeIcon icon={faTwitter} className='h-8' />
      </a></Link>
      <Link href='https://instagram.com/glitteringkatie'><a className='flex items-center mx-4 text-pine hover:text-cream transition-colors'>
        <FontAwesomeIcon icon={faInstagram} className='h-8' />
      </a></Link>
      <Link href='https://github.com/glitteringkatie'><a className='flex items-center mx-4 text-pine hover:text-cream transition-colors'>
        <FontAwesomeIcon icon={faGithub} className='h-8 mr' />
      </a></Link>
    </div>
    : null;

  const footer = <footer className='pt-12 pb-8 bg-fern'>
    {socialFooter}
    <p className='text-lg text-center'>© {today.getFullYear()}, Built with {emojis[emojiIndex.current]} and <a href="https://nextjs.org/" className='text-pine hover:text-cream'>Next.js</a></p>
  </footer>

  if (page === 'post' && post) {
    return (
      <>
        <Meta ownImage={!!post.coverImage} ownTitle />
        <div className="min-h-screen bg-cream flex flex-col">

          <div className={classNames(['py-4', 'sm:py-8', 'flex', 'w-full', 'md:w-5xl', 'max-w-5xl', 'mx-auto', 'px-4', 'items-center'])}>
            <Link href='/' >
              <a className='flex-1'>
                <GKLogo className='w-2/3 sm:w-96' />
              </a>
            </Link>
            <Link href='/posts'>
              <a className='font-serif font-semibold text-2xl sm:text-3xl text-pine hover:text-fern'>
                blog
              </a>
            </Link>
          </div>
          <div className="mb-8 md:mb-16 sm:mx-0">
            <CoverImage title={post.title} src={post.coverImage} position={post.coverPosition} />
          </div>
          <main className='flex-1'>{children}</main>
          {footer}
        </div>
      </>
    )
  }
  return (
    <BalanceContext.Provider value={balanceValue}>
      <Meta />
      <div className="min-h-screen bg-cream flex flex-col">

        <div className={classNames([padding])}>
          <Link href='/' >
            <a>
              <GKLogo className='max-w-2xl w-full mx-auto pb-4 px-8' />
            </a>
          </Link>
          <div className="flex items-center justify-center">
            <span className={workLifeLabelClasses}>work</span>
            <input
              type="range"
              min={WORK}
              max={LIFE}
              defaultValue={BALANCE}
              value={balanceValue}
              style={{
                backgroundSize: backgroundSize[balanceValue]
              }}
              onChange={(event) => setBalanceValue(event.target.value as BalanceCategory)}
            />
            <span className={workLifeLabelClasses}>life</span>
          </div>
        </div>
        <main className='flex-1'>{children}</main>
        {footer}
      </div>
    </BalanceContext.Provider>
  )
}

const FUN = [
  "✨",
  "💖",
  "🤷🏼‍♀️",
  "😂",
  "🍾",
  "🔮",
  "🥳",
  "🙃",
  "🤦🏼‍♀️",
  "🍑",
  "🤸🏼‍♀️",
  "🎨",
  "🎉",
  "🎶",
  "😻",
  "🥑",
  "🎪",
]

const HALLOWEEN = ["🎃", "🎂", "🥳", "🦇", "🍂", "🍁", "🎁"]
const CHRISTMAS = ["🎄", "🎅🏼", "⛄️", "❄️", "🤶🏼", "🌲"]

export default Layout
