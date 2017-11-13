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
