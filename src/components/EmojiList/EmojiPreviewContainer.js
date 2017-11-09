import React from 'react';
import PropTypes from 'prop-types';

const EmojiPreviewContainer = ({ children }) => (
  <ul className="emoji-card-container">{children}</ul>
);

EmojiPreviewContainer.propTypes = { children: PropTypes.node };

export { EmojiPreviewContainer as default };
