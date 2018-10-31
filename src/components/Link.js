import React from 'react';
import PropTypes from 'prop-types';

const openInNewTab = href => e => {
  if (chrome && 'tabs' in chrome) {
    e.preventDefault();
    chrome.tabs.create({ url: href });
  }
};

function Link({ href, children, ...props }) {
  return (
    <a href={href} {...props} onClick={openInNewTab(href)}>
      {children}
    </a>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export { Link as default };
