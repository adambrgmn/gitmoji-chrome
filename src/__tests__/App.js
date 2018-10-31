import React from 'react';
import { render, waitForElement, fireEvent } from 'react-testing-library';
import App from '../App';

it('renders two buttons and current count', async () => {
  const { getByText } = render(<App />);
  await waitForElement(() => getByText(/\+/));

  const increment = getByText(/\+/);
  const decrement = getByText(/-/);

  expect(getByText(/\d/)).toHaveTextContent(0);

  fireEvent.click(increment);
  await waitForElement(() => getByText('1'));

  fireEvent.click(decrement);
  await waitForElement(() => getByText('0'));
});
