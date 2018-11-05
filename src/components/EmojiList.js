import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fuzz from 'fuzzaldrin-plus';
import { modularScale } from 'polished';
import EmojiListItem from './EmojiListItem';
import { EmojiResource } from '../resources';
import { addToRecentEmojis, copyText } from '../api';

const filterEmojis = (emojis, filter) =>
  fuzz.filter(emojis, filter, { key: 'filterKey' });

const EmojiPreviewContainer = styled.ul`
  width: 100%;
  padding: 0 ${modularScale(0)};
  margin-top: ${modularScale(1)};
`;

function EmojiList({ filter }) {
  const emojis = EmojiResource.read();

  const filteredEmojis = useMemo(
    () => (filter.length < 1 ? emojis : filterEmojis(emojis, filter)),
    [emojis, filter],
  );

  const handleClick = emoji => {
    copyText(emoji.code);
    addToRecentEmojis(emoji);
  };

  return (
    <EmojiPreviewContainer>
      {filteredEmojis.map(emoji => (
        <EmojiListItem key={emoji.code} emoji={emoji} onClick={handleClick} />
      ))}
    </EmojiPreviewContainer>
  );
}

EmojiList.propTypes = {
  filter: PropTypes.string.isRequired,
};

export { EmojiList as default };
