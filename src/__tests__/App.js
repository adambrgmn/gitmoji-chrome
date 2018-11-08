import React from 'react';
import { render, waitForElement, fireEvent } from 'react-testing-library';
import App from '../App';

jest.mock('../api/emojis');

it('should render without problem', async () => {
  const { getByText } = render(<App />);
  const el = await waitForElement(() => getByText(/:art:/));
  expect(el).toBeInTheDocument();
});

it('should be able to navigate to settings screen', async () => {
  const { getByText } = render(<App />);
  const el = getByText(/go to settings/i);

  fireEvent.click(el);
  await waitForElement(() => getByText(/about/i));
  expect(getByText(/about/i)).toBeInTheDocument();
});
