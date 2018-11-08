import React from 'react';
import { waitForElement, fireEvent } from 'react-testing-library';
import EmojiList from '../EmojiList';
import { render } from '../../../test/utils';
import gitmojis from '../../../test/data/gitmojis.json';
import { handleEmojiClick } from '../../utils';

jest.mock('../../api/emojis.js');
jest.mock('../../utils.js');

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

it('should add an emoji to recents when clicking', async () => {
  const { getByTestId } = render(<EmojiList filter="" />);

  const emoj = await waitForElement(() => getByTestId('emoji-item'));

  fireEvent.click(emoj);
  expect(handleEmojiClick).toHaveBeenCalled();
});
