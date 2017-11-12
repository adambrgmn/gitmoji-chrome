import styled from 'styled-components';
import { modularScale } from 'polished';

const RecentPreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: ${modularScale(-1)};
  width: 100%;
  margin-top: ${modularScale(1)};
  padding: 0 ${modularScale(0)};
`;

export { RecentPreviewContainer as default };
