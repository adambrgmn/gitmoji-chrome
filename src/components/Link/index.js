/* global chrome */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  handleClick = e => {
    if (chrome && 'tabs' in chrome) {
      e.preventDefault();
      chrome.tabs.create({ url: this.props.href });
    }
  };

  render() {
    const { href, className, children } = this.props;

    return (
      <a href={href} className={className} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

export { Link as default };
