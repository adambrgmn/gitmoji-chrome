const pify = method => (...args) =>
  new Promise((resolve, reject) => {
    const callbackHandler = (...result) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      resolve(...result);
    };

    try {
      method(...args, callbackHandler);
    } catch (err) {
      reject(err);
    }
  });

const get = pify(chrome.storage.sync.get);
const set = pify(chrome.storage.sync.set);
const clear = pify(chrome.storage.sync.clear);

const subscribe = callback => {
  chrome.storage.onChanged.addListener(callback);
  return () => {
    chrome.storage.onChanged.removeListener(callback);
  };
};

const subscribeTo = (key, callback) => {
  const handleChange = changes => {
    if (key in changes) {
      const { newValue, oldValue } = changes[key];
      callback(newValue, oldValue);
    }
  };

  const unsubscribe = subscribe(handleChange);
  return unsubscribe;
};

export { set, get, clear, subscribe, subscribeTo };
