import { useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import GlitteringKatieMark from './glitteringkatie-mark'
import { WORK, LIFE, BALANCE, BalanceCategory, BalanceContext } from '../context/balanceContext'

type Props = {
  page?: string
  children: React.ReactNode
}

const Layout = ({ page = 'home', children }: Props) => {
  const [balanceValue, setBalanceValue] = useState<BalanceCategory>(BALANCE);
  const workLifeLabelClasses = classNames(['text-warmBlack', 'text-4xl', 'font-serif', 'italic']);

  const backgroundSize: { [key in BalanceCategory]: string } = {
    [WORK]: "0% 100%",
    [BALANCE]: "50% 100%",
    [LIFE]: "100% 100%",
  }

  const padding = page === 'home'
    ? "py-28"
    : "py-16"
  return (
    <BalanceContext.Provider value={balanceValue}>
      <Meta />
      <div className="min-h-screen bg-cream">

        <div className={classNames([padding])}>
          <Link href='/' >
            <a>
              <GlitteringKatieMark />
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
              onChange={(event) => {
                console.log(event.target.value);
                return setBalanceValue(event.target.value as BalanceCategory);
              }}
            />
            <span className={workLifeLabelClasses}>life</span>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </BalanceContext.Provider>
  )
}

export default Layout
