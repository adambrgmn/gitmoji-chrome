/* eslint-disable no-undef */

export const get = key =>
  new Promise((resolve, reject) => {
    if (chrome && 'storage' in chrome) {
      chrome.storage.sync.get(key, items => {
        resolve(items);
      });
    } else {
      reject(new Error('No chrome.storage'));
    }
  });

export const set = (key, value) =>
  new Promise((resolve, reject) => {
    if (chrome && 'storage' in chrome) {
      try {
        const obj = { [key]: value };
        chrome.storage.sync.set(obj, () => {
          return resolve();
        });
      } catch (e) {
        return reject(e);
      }
    } else {
      reject(new Error('No chrome.storage'));
    }
  });
