import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchEmojis } from '../../store/emojis/actions';
import * as types from '../../propTypes';

import './emojiList.css';
import EmojiPreviewContainer from './EmojiPreviewContainer';
import EmojiPreview from './EmojiPreview';

class EmojiList extends PureComponent {
  static propTypes = {
    emojis: PropTypes.arrayOf(types.emoji).isRequired,
    fetchEmojis: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchEmojis();
  }

  handleClick = emoji => () => console.log(emoji);

  render() {
    const { emojis } = this.props;
    return (
      <EmojiPreviewContainer>
        {emojis.map(emoji => (
          <EmojiPreview
            key={emoji.name}
            emoji={emoji}
            onClick={this.handleClick(emoji)}
          />
        ))}
      </EmojiPreviewContainer>
    );
  }
}

const mapStateToProps = state => ({
  emojis: state.emojis.items,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchEmojis }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmojiList);
