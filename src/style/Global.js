import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    min-width: 20rem;
    margin: 0;
    padding: 0;
    background-color: ${p => p.theme.color.yellow};
  }
`;

export { Global as default };
