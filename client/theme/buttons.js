import { lighten } from 'polished';
import colors from './colors';

const buttons = {
  default: {
    color: 'black',
    backgroundColor: lighten(0.1, colors.primary),
  },
};

export default buttons;
