/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { RecentPreview, RecentPreviewEmpty } from './RecentPreview';
import {
  getRecentEmojis,
  addToRecentEmojis,
  subscribeToRecent,
  copyText,
} from '../api';

const recentResource = createResource(() => getRecentEmojis());

const RecentPreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: ${modularScale(-1)};
  width: 100%;
  margin-top: ${modularScale(1)};
  padding: 0 ${modularScale(0)};
`;

function RecentList() {
  const initialEmojis = recentResource.read();
  const [emojis, setEmojis] = useState(initialEmojis);

  useEffect(() => subscribeToRecent(setEmojis), []);

  const recents = [...emojis, ...Array.from({ length: 5 })].slice(0, 5);

  const handleClick = emoji => {
    copyText(emoji.code);
    addToRecentEmojis(emoji);
  };

  return (
    <RecentPreviewContainer>
      {recents.map(
        (emoji, i) =>
          emoji != null ? (
            <RecentPreview
              key={emoji.code}
              emoji={emoji}
              onClick={handleClick}
            />
          ) : (
            <RecentPreviewEmpty disable key={i} />
          ),
      )}
    </RecentPreviewContainer>
  );
}

export { RecentList as default };
