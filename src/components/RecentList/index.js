import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as types from '../../propTypes';
import * as actions from '../../store/recent/actions';

import './recentList.css';
import RecentPreviewContainer from './RecentPreviewContainer';
import RecentPreview from './RecentPreview';
import RecentEmpty from './RecentEmpty';

class RecentList extends PureComponent {
  static propTypes = {
    emojis: PropTypes.arrayOf(types.emoji).isRequired,
    addRecent: PropTypes.func.isRequired,
    getRecent: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getRecent();
  }

  handleClick = (emoji) => () => {
    this.props.addRecent(emoji);
  }

  render() {
    const { emojis } = this.props;
    const recents = [...emojis, ...Array.from({ length: 5 - emojis.length })];

    return (
      <RecentPreviewContainer>
        {recents.map(
          (emoji, i) =>
            emoji != null ? (
              <RecentPreview
                key={emoji.code}
                emoji={emoji}
                onClick={this.handleClick(emoji)}
              />
            ) : (
              <RecentEmpty key={i} />
            ),
        )}
      </RecentPreviewContainer>
    );
  }
}

const mapStateToProps = state => ({ emojis: state.recent });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecentList);
