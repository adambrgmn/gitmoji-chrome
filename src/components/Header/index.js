import React from 'react';
import Logotype from '../Logotype';
import './header.css';

function Header() {
  return (
    <header className="header">
      <Logotype />
    </header>
  );
}

export { Header as default };
