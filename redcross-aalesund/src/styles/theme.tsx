import { DefaultTheme } from 'styled-components'


export const defaultTheme: DefaultTheme = {
    borderRadius: '.5rem',
    fontSizes: {
      xSmall: "1.4rem",
      small: "1.6rem",
      medium: "1.8rem",
      large: "2.4rem",
      xLarge: "3.6rem",
    },
    breakPoints: {
      // 600px
      phone: "37.5em",
      // 900px
      tablet: "50em",
      // 1200px
      tabletLandScape: "75em",
      // 1340px
      laptop: "84em",
    },
    palette: {
        common: {
            black: '#333',
            white: '#fff'
        },
        primary: {
            background: "#f3f3f3",
            accentColor: '#D52B1E',
        },
        // not in use, but can be used to create a different theme like dark theme for an example....
        secondary: {
            background: "#f3f3f3",
            accentColor: '#D52B1E',
        }
    }
}