import emojis from '../../../test/data/emojis.json';

const getRecent = jest.fn(() => Promise.resolve(emojis.slice(0, 5)));

const addToRecent = jest.fn(() => Promise.resolve());

const subscribeToRecent = jest.fn();

export { getRecent, addToRecent, subscribeToRecent };
