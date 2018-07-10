/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as AccountHome } from './account/home';
export { default as Test } from './test/';
export { default as Faq } from './faq/';
export { default as About } from './about';
export { default as NoMatch } from './noMatch';
export { default as NotAuthorized } from './notAuthorized';
export { default as ScrollToTop } from './scrollToTop';
export { default as BasicToolTip } from './tooltip/basic';
export { default as ChildToolTip } from './tooltip/child';
export { default as Privacy } from './policy/privacy';
export { default as Cookies } from './policy/cookies';
export { default as Terms } from './policy/terms';
export { default as WithTracker } from './withTracker';
