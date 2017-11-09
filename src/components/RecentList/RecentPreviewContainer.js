import React from 'react';
import PropTypes from 'prop-types';

function RecentPreviewContainer({ children }) {
  return <div className="recent-container">{children}</div>;
}

RecentPreviewContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RecentPreviewContainer as default };
