import 'styled-components';

interface IPalette {
    // background color for app
    background: string
    // accent color for app. This should be the red color that red cross uses
    accentColor: string
}
declare module 'styled-components' {

    export interface DefaultTheme {
        borderRadius: string
        fontSizes: {
          xSmall: string,
          small: string,
          medium: string,
          large: string,
          xLarge: string,
        },
        breakPoints: {
            phone: string,
            tablet: string,
            tabletLandScape: string,
            laptop: string,
        }
        palette: {
            common: {
                black: string
                white: string
            }
            primary: IPalette
            secondary: IPalette
        }
    }
}