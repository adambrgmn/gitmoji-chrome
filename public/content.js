/* eslint-disable no-undef */
chrome.extension.onMessage.addListener((message, sender, sendResponse) => {
  try {
    const { code } = message.emoji;
    const el = document.activeElement;

    if (el && el.type === 'text') {
      el.value = `${code} ${el.value}`;
    }

    sendResponse({ success: true });
  } catch (e) {
    sendResponse({ success: false });
  }
});
