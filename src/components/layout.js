import React, { useRef } from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const today = new Date()
  let emojis = FUN
  if (today.getMonth() >= 10) {
    // zero indexed months, 10 == 11 == NOV
    emojis = emojis.concat(CHRISTMAS)
  } else if (today.getMonth() >= 8) {
    // 8 == 9 == SEP
    emojis = emojis.concat(HALLOWEEN)
  }

  const rootPath = `${__PATH_PREFIX__}/`
  const emojiIndex = useRef(Math.floor(Math.random() * emojis.length))
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.3),
          marginBottom: rhythm(1.3),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {today.getFullYear()}, Built with {emojis[emojiIndex.current]} and
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
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
]

const HALLOWEEN = ["🎃", "🎂", "🥳", "🦇", "🍂", "🍁", "🎁"]
const CHRISTMAS = ["🎄", "🎅🏼", "⛄️", "❄️", "🤶🏼", "🌲"]

export default Layout
