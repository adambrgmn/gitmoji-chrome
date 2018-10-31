import emojis from '../../test/data/emojis.json';

const fetchEmojis = jest.fn(() => Promise.resolve(emojis));

const getRecentEmojis = jest.fn(() => Promise.resolve(emojis.slice(0, 5)));

const addToRecentEmojis = jest.fn(() => Promise.resolve());

export { fetchEmojis, getRecentEmojis, addToRecentEmojis };
