import PropTypes from 'prop-types';

const emoji = PropTypes.shape({
  emoji: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  color: PropTypes.string,
  description: PropTypes.string.isRequired,
});

export { emoji };
