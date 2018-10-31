import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Link from '../Link';

beforeEach(() => {
  global.chrome = {
    tabs: {
      create: jest.fn(),
    },
  };
});

afterEach(() => {
  delete global.chrome;
});

it('should render a link that uses chrome to open new tab', () => {
  const href = 'www.example.com';
  const { getByText } = render(<Link href={href}>link</Link>);
  const link = getByText(/link/);

  fireEvent.click(link);
  expect(chrome.tabs.create).toHaveBeenCalled();
  expect(chrome.tabs.create).toHaveBeenCalledWith({ url: href });
});
