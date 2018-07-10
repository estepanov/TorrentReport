import mobile from '../theme/mobile';
/**
 * ACTION TYPES
 */
const SET_WIDTH = 'SET_WIDTH';
const TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU';

/**
 * INITIAL STATE
 */
const defaultData = {
  width: window.innerWidth, // eslint-disable-line
  isMobile: window.innerWidth <= mobile.pixelWidth, // eslint-disable-line
  showMobileMenu: false,
};

/**
 * ACTION CREATORS
 */
export const setWidth = width => ({ type: SET_WIDTH, width });
export const toggleMobileMenu = () => ({ type: TOGGLE_MOBILE_MENU });

/**
 * THUNK CREATORS
 */
export const getWindowWidth = () => (dispatch) => {
  // eslint-disable-next-line
  const width = window.innerWidth;
  return dispatch(setWidth(width));
};

/**
 * REDUCER
 */
export default function (state = defaultData, action) {
  switch (action.type) {
    case SET_WIDTH:
      return { ...state, width: action.width, isMobile: action.width <= mobile.pixelWidth };
    case TOGGLE_MOBILE_MENU:
      return { ...state, showMobileMenu: !state.showMobileMenu };
    default:
      return state;
  }
}
