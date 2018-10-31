import React from 'react';
import { waitForElement, fireEvent } from 'react-testing-library';
import { render } from '../../../test/utils';
import RecentList from '../RecentList';
import { getRecentEmojis, addToRecentEmojis } from '../../api';

jest.mock('../../api.js');

it('should render a list of recently used emojis', async () => {
  const recent = await getRecentEmojis();
  const { getAllByTestId } = render(<RecentList />);
  const emojis = await waitForElement(() => getAllByTestId('recent-emoji'));

  expect(emojis).toHaveLength(recent.length);
});

it('should add an emoji to recents when clicking', async () => {
  const { getByTestId } = render(<RecentList />);

  const btn = await waitForElement(() => getByTestId('recent-emoji'));

  fireEvent.click(btn);
  expect(addToRecentEmojis).toHaveBeenCalled();
});
