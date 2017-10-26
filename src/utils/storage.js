/* global chrome */

export const get = key =>
  new Promise((resolve, reject) => {
    if (chrome && 'storage' in chrome) {
      try {
        chrome.storage.sync.get(key, items => {
          resolve(items);
        });
      } catch (e) {
        reject(e);
      }
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
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    } else {
      reject(new Error('No chrome.storage'));
    }
  });
