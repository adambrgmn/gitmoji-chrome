import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as types from '../../propTypes';
import * as actions from '../../store/recent/actions';
import { copy } from '../../store/messages/actions';
import { uniqRecentSelector } from '../../store/recent/selectors';
import RecentPreviewContainer from './RecentPreviewContainer';
import { RecentPreview, RecentPreviewEmpty } from './RecentPreview';

class RecentList extends PureComponent {
  static propTypes = {
    emojis: PropTypes.arrayOf(types.emoji).isRequired,
    copy: PropTypes.func.isRequired,
    addRecent: PropTypes.func.isRequired,
    getRecent: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getRecent();
  }

  handleClick = emoji => {
    this.props.addRecent(emoji);
    this.props.copy(emoji);
  };

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
                onClick={this.handleClick}
              />
            ) : (
              <RecentPreviewEmpty disable key={i} />
            ),
        )}
      </RecentPreviewContainer>
    );
  }
}

const mapStateToProps = state => ({ emojis: uniqRecentSelector(state) });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions, copy }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecentList);
