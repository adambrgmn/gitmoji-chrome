/* global chrome */

export const send = message =>
  new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({ active: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, message, res => resolve(res));
      });
    } catch (e) {
      reject(e);
    }
  });
