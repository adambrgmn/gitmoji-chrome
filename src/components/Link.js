import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const openInNewTab = href => e => {
  if (chrome && 'tabs' in chrome) {
    e.preventDefault();
    chrome.tabs.create({ url: href });
  }
};

const A = styled.a`
  color: ${p => p.theme.color.pink};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Link = memo(({ href, children, ...props }) => (
  <A href={href} {...props} onClick={openInNewTab(href)}>
    {children}
  </A>
));

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export { Link as default };
