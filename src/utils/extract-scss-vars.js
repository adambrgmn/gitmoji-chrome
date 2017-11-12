const extract = scss => {
  const variableRe = /((\w|-)+): \$(\w+),/g;
  const match = [];
  let haveResult = true;

  while (haveResult) {
    const result = variableRe.exec(scss);

    if (result == null || result.length < 1) {
      haveResult = false;
    } else {
      const emojiName = result[1];
      const colorName = result[3];
      const re = new RegExp(`\\$${colorName}\\s?: (#.{6});`, 'g');
      const [, color] = re.exec(scss);

      match.push({ name: emojiName, color });
    }
  }

  return match;
};

export { extract as default };
