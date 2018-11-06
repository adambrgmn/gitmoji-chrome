import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundry extends PureComponent {
  static propTypes = {
    renderError: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState(() => ({ error }));
  }

  resetError = () => this.setState(() => ({ error: null }));

  render() {
    const { renderError, children } = this.props;
    const { error } = this.state;

    if (error) {
      return renderError({ error, resetError: () => this.resetError() });
    }

    return children;
  }
}

export { ErrorBoundry as default };
