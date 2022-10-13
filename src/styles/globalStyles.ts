import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body ,#__next  {
    width: 100%;
    font-family: 'Pretendard';
  }
`;

export default GlobalStyle;