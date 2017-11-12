import styled from 'styled-components';

const RecentPreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: var(--scale--1);
  width: 100%;
  margin-top: var(--scale-1);
  padding: 0 var(--scale-0);
`;

export { RecentPreviewContainer as default };
