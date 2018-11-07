import React from 'react';
import { fireEvent, wait } from 'react-testing-library';
import { render, flushEffects } from '../../../test/utils';
import Notifications from '../Notifications';
import { emitter, events } from '../../api/events';
import emojis from '../../../test/data/emojis.json';

const renderAndEmit = () => {
  const methods = render(<Notifications />);

  /**
   * This is needed because of: https://github.com/kentcdodds/react-testing-library/pull/216
   * It will trigger the useEffect-hook inside <Notifications /> and start
   * listening to from the emitter
   */
  flushEffects();

  const [emoji] = emojis;
  emitter.emit(events.copy, emoji);

  const emojiRegExp = new RegExp(`${emoji.code}`, 'i');
  return { emojiRegExp, ...methods };
};

beforeEach(() => {
  jest.useFakeTimers();
});

it('should react to events', () => {
  const { getByText, emojiRegExp } = renderAndEmit();
  expect(getByText(emojiRegExp)).toBeInTheDocument();
});

it('should remove the notification after timeout', async () => {
  const { queryByText, emojiRegExp, getByText } = renderAndEmit();
  expect(getByText(emojiRegExp)).toBeInTheDocument();

  jest.runAllTimers();

  // Await animation to finish
  await wait(() => expect(queryByText(emojiRegExp)).not.toBeInTheDocument());
});

it('should remove notification when clicking button', async () => {
  const { getByText } = renderAndEmit();

  const btn = getByText(/dismiss/i);
  fireEvent.click(btn);

  // Await animation to finish
  await wait(() => expect(btn).not.toBeInTheDocument());
});
