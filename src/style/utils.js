import { css } from 'styled-components';
import { transitions, timingFunctions, opacify } from 'polished';
import { color } from './theme';

const transition = (...props: TransitionProps[]) => css`
  ${transitions(
    ...props.map(p => {
      if (typeof p === 'string') {
        return `${p} 0.3s ${timingFunctions('easeInOutSine')}`;
      }

      return `${p.prop} ${p.duration || '0.3s'} ${p.timing ||
        timingFunctions('easeInOutSine')}`;
    }),
  )};
  will-change: ${props
    .map(p => {
      if (typeof p === 'string') return p;
      return p.prop;
    })
    .join(', ')};
`;

const boxShadow = hover => css`
  box-shadow: 0 1px 2px 0 ${opacify(0.6, color.shadow)};

  ${hover &&
    css`
      &:hover {
        box-shadow: 0 4px 8px 0 ${opacify(0.6, color.shadow)};
      }
    `};
`;

export { transition, boxShadow };
