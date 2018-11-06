/* eslint-disable no-console */
import React, { Suspense } from 'react';
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

export { render, disableConsole };
