const mergeArrayOfObjects = (key, arr1, arr2) =>
  arr1.map(item => {
    const matchingItem = arr2.find(i => i[key] === item[key]);

    if (matchingItem != null) return { ...item, ...matchingItem };
    return item;
  });

export { mergeArrayOfObjects as default };
