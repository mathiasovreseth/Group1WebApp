import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  //html {
  //  margin: 2rem;
  //}

  // removes default styling from link tags
  a:-webkit-any-link {
    color: inherit;
    text-decoration: none;
  }

  * {
    margin: 0;
    padding: 0;
    font-size: 70%;
    font-family: 'Lato', sans-serif;
    box-sizing: border-box;
    font-style: normal;
    overflow-x: hidden;
  }

  body {
    background: ${props => `${props.theme.palette.common.white}`};
  }
`;

export default GlobalStyle;