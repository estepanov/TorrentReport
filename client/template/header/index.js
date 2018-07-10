import React from 'react';
import { connect } from 'react-redux';
import { logout, toggleMobileMenu } from '../../store';
import DesktopHeader from './desktop';
import MobileHeader from './mobile';

const Header = (props) => {
  const {
    showMobileMenu, isMobile, handleLogout, isLoggedIn, toggleMobileMenuVisibility,
  } = props;
  if (isMobile) {
    return (
      <MobileHeader
        showMenu={showMobileMenu}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        toggleMenu={toggleMobileMenuVisibility}
      />
    );
  }
  return <DesktopHeader isLoggedIn={isLoggedIn} handleLogout={handleLogout} />;
};

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  showMobileMenu: state.config.showMobileMenu,
  isMobile: state.config.isMobile,
});

const mapDispatch = dispatch => ({
  handleLogout() {
    dispatch(logout());
  },
  toggleMobileMenuVisibility() {
    dispatch(toggleMobileMenu());
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Header);
