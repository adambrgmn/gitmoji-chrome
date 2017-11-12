import styled from 'styled-components';
import { modularScale } from 'polished';

const EmojiPreviewContainer = styled.ul`
  width: 100%;
  padding: 0 ${modularScale(0)};
  margin-top: ${modularScale(1)};
`;

export { EmojiPreviewContainer as default };
