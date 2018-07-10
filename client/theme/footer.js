import { lighten } from 'polished';
import colors from './colors';

const footer = {
  minHeight: '8em',
  backgroundColor: lighten(0.95, colors.quinary),
  linkColor: colors.tertiary,
};

export default footer;
