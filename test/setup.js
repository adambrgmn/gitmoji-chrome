import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

function defineChromeGlobals() {
  window.chrome = {
    storage: {
      sync: {
        get: jest.fn(),
        set: jest.fn(),
        clear: jest.fn(),
      },
    },
  };
}

defineChromeGlobals();
