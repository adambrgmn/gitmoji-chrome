import React from 'react';
import { waitForElement } from 'react-testing-library';
import EmojiList from '../EmojiList';
import { render } from '../../../test/utils';
import gitmojis from '../../../test/data/gitmojis.json';

jest.mock('../../api.js');

it('should render a list of emojis', async () => {
  const { getAllByText } = render(<EmojiList filter="" />);
  const emojis = await waitForElement(() => getAllByText(/:\w+:/));

  expect(emojis).toHaveLength(gitmojis.length);
});

it('should filter out emojis based on filter string', async () => {
  const { getAllByText } = render(<EmojiList filter=":zap:" />);
  const emojis = await waitForElement(() => getAllByText(/:\w+:/));

  expect(emojis).toHaveLength(1);
});
