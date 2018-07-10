import { lighten, darken } from 'polished';
import colors from './colors';

const notifications = {
  info: {
    backgroundColor: lighten(0.3, colors.secondary),
    color: colors.secondary,
    textColor: darken(0.4, colors.secondary),
  },
  success: {
    backgroundColor: lighten(0.3, colors.octonary),
    color: colors.octonary,
    textColor: darken(0.4, colors.octonary),
  },
  error: {
    backgroundColor: lighten(0.3, colors.septenary),
    color: colors.septenary,
    textColor: darken(0.4, colors.septenary),
  },
};

export default notifications;
