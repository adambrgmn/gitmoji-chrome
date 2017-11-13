/* global chrome */

const get = key =>
  new Promise((resolve, reject) => {
    if (chrome && 'storage' in chrome) {
      try {
        chrome.storage.sync.get(key, items => {
          resolve(items[key]);
        });
      } catch (e) {
        reject(e);
      }
    } else {
      const item = window.localStorage.getItem(key);
      resolve(item ? JSON.parse(item) : null);
    }
  });

const set = (key, value) =>
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
      const item = JSON.stringify(value);
      window.localStorage.setItem(key, item);
      resolve();
    }
  });

export { get, set };
