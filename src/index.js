import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';
import { modularScale } from 'polished';
import App from './App';
import initStore from './store';
import { color, font } from './style/theme';

const store = initStore();
const rootEl = document.getElementById('root');

injectGlobal`
  body {
    font-family: ${font.body};
    font-size: ${modularScale(0)};
    background-color: ${color.bg};
  }
`;

if (rootEl != null) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl,
  );
}

injectGlobal`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
  }

  body {
    min-width: 20rem;
    margin: 0;
    padding: 0;
    font-family: ${font.body};
    font-size: ${modularScale(0)};
    background-color: ${color.bg};
  }
`;
