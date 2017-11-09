import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import initStore from './store';

const store = initStore();
const rootEl = document.getElementById('root');

if (rootEl != null) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl,
  );
}
