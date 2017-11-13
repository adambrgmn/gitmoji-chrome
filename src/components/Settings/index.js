import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { injectGlobal } from 'styled-components';
import { modularScale } from 'polished';
import SettingsContainer from './SettingsContainer';
import Stats from '../Stats';
import Footer from '../Footer';
import { toggleSettings } from '../../store/settings/actions';
import { messageSuccess, messageError } from '../../store/messages/actions';
import { resetState } from '../../store/actions';
import { settingsVisibleSelector } from '../../store/settings/selectors';
import * as storage from '../../utils/storage';
import { font, color } from '../../style/theme';
import { boxShadow, transition } from '../../style/utils';

const ToggleButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  border: none;
  border-radius: 0;
  padding: ${modularScale(-2)};
  font-size: ${modularScale(0)};
  background-color: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const FormGroup = styled.div`
  border-bottom: 1px solid ${color.black};
  padding: ${modularScale(2)} 0;
  font-family: ${font.body};

  &:last-child {
    border-bottom: none;
  }
`;

const FormGroupButton = styled.button`
  width: 100%;
  margin: 0;
  border: none;
  border-radius: 4px;
  padding: ${modularScale(-1)};
  background-color: ${color.orange};
  font-size: ${modularScale(0)};
  font-weight: 200;
  color: ${color.white};

  &:hover,
  &:focus {
    transform: translateY(-3px);
    outline: none;
  }

  ${boxShadow(true)};
  ${transition('box-shadow', 'transform')};
`;

const FormGroupDesc = styled.p`
  margin-bottom: ${modularScale(0)};
  font-size: ${modularScale(-1)};
  color: ${color.black};

  &:last-child {
    margin-bottom: 0;
  }
`;

class Settings extends PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggleSettings: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    messageSuccess: PropTypes.func.isRequired,
    messageError: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    if (this.props.show) {
      injectGlobal`body { overflow: hidden; }`;
    } else {
      injectGlobal`body { overflow: initial; }`;
    }
  }

  handleClear = async () => {
    try {
      await storage.clear();
      this.props.resetState();
      this.props.messageSuccess({
        message: 'History cleared. Restart app to clear state.',
        icon: '🔥',
      });
    } catch (e) {
      this.props.messageError(e);
    }
  };

  render() {
    const { show, toggleSettings } = this.props;
    return [
      <SettingsContainer key="settings" show={show}>
        <FormGroup>
          <FormGroupButton onClick={this.handleClear}>
            <span role="img" aria-label="fire emoji">
              🔥
            </span>{' '}
            Clear history
          </FormGroupButton>
          <FormGroupDesc>
            (Clearing gitmoji history will remove all stats)
          </FormGroupDesc>
        </FormGroup>

        <FormGroup>
          <Stats />
        </FormGroup>

        <FormGroup>
          <Footer />
        </FormGroup>
      </SettingsContainer>,

      <ToggleButton key="toggle-btn" onClick={toggleSettings}>
        <span role="img" aria-label="emoji">
          {show ? '👌🏿' : '🛠'}
        </span>
      </ToggleButton>,
    ];
  }
}

const mapStateToProps = state => ({
  show: settingsVisibleSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleSettings,
      resetState,
      messageSuccess,
      messageError,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
