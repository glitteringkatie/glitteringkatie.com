import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.headerFontFamily = ["Corben", "serif"]

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    h1: {
      fontFamily: `"Corben", "serif"`,
    },
    a: {
      color: "#BE4B41",
    },
    "h1,h2,h3,h4,h5,h6": {
      color: "#005E61",
    },
    body: {
      backgroundColor: "#F2F8F8",
    },
    blockquote: {
      borderLeftColor: "#005E61",
      color: "hsla(182, 100%, 19%, 80%)",
    },
    ".secondary": {
      fontSize: `${Wordpress2016.scaleRatio * 0.6}rem`,
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016, {})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
