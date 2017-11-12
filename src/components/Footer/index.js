import React from 'react';
import Link from '../Link';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="credit">
        Send all love to{' '}
        <Link href="https://github.com/carloscuesta/gitmoji/">
          carloscuesta/gitmoji
        </Link>
      </p>
    </footer>
  );
}

export { Footer as default };
