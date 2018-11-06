import emojis from '../../../test/data/emojis.json';

const getEmojis = jest.fn(() => Promise.resolve(emojis));

export { getEmojis };
