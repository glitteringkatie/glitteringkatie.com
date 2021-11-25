import { useState } from 'react'
import classNames from 'classnames'
import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import GlitteringKatieMark from './glitteringkatie-mark'
import { WORK, LIFE, BALANCE, BalanceCategory, BalanceContext } from '../context/balanceContext'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  const [balanceValue, setBalanceValue] = useState<BalanceCategory>(BALANCE);
  const workLifeLabelClasses = classNames(['text-warmBlack', 'text-4xl', 'font-serif', 'italic']);
  return (
    <BalanceContext.Provider value={balanceValue}>
      <Meta />
      <div className="min-h-screen bg-cream">

        <div className="py-28">
          <GlitteringKatieMark />
          <div className="flex items-center justify-center">
            <span className={workLifeLabelClasses}>work</span>
            <input
              type="range"
              min={WORK}
              max={LIFE}
              defaultValue={BALANCE}
              value={balanceValue}
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
      <Footer />
    </BalanceContext.Provider>
  )
}

export default Layout
