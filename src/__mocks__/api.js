import emojis from '../../test/data/emojis.json';

const fetchEmojis = jest.fn(() => Promise.resolve(emojis));

const getRecentEmojis = jest.fn(() => Promise.resolve(emojis.slice(0, 5)));

const addToRecentEmojis = jest.fn(() => Promise.resolve());

const subscribeToRecent = jest.fn();

const copyText = jest.fn();

export {
  fetchEmojis,
  getRecentEmojis,
  addToRecentEmojis,
  subscribeToRecent,
  copyText,
};
