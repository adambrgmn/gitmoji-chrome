import React, { ConcurrentMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConcurrentMode>
    <App />
  </ConcurrentMode>,
);
