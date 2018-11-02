const get = key =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, resolve);
    } catch (err) {
      reject(err);
    }
  });

const set = obj =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.set(obj, resolve);
    } catch (err) {
      reject(err);
    }
  });

const subscribe = callback => {
  chrome.storage.onChanged.addListener(callback);
  return () => {
    chrome.storage.onChanged.removeListener(callback);
  };
};

export { set, get, subscribe };
