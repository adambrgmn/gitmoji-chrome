const mergeWithColors = (emojis, colors) => {
  return emojis.map(emoji => {
    const matchingColor = colors.find(c => c.name === emoji.name);
    return { ...emoji, ...matchingColor };
  });
};

export { mergeWithColors as default };
