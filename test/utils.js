/* eslint-disable no-console */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { render as rtlRender } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import * as theme from '../src/style/theme';

const render = component =>
  rtlRender(
    <Suspense fallback={<p>Loading...</p>}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </Suspense>,
  );

const disableConsole = (method = 'log') => {
  let originalConsole;

  beforeEach(() => {
    originalConsole = console[method];
    console[method] = () => {};
  });

  afterEach(() => {
    console[method] = originalConsole;
  });
};

const flushEffects = () => {
  const Noop = () => null;
  ReactDOM.render(<Noop />, document.createElement('template'));
};

export { render, disableConsole, flushEffects };
