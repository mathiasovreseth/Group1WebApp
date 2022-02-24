import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-size: 62.5%;
    background: #f3f3f3;
    font-family: myriad-pro, sans-serif;
    font-weight: 700;
    box-sizing: border-box;
    font-style: normal;
  }
`;

export default GlobalStyle;