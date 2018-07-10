import React from 'react';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/fontawesome-free-solid';

import Navigation from '../navigation/mobile';
import Logo from './logo';

/**
 * STYLES
 */

const MobileHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
  height: ${props => props.theme.mobile.header.height};
  background-color: ${props => props.theme.colors.header.background};
`;
const ToggleContainer = styled.div`
  position: absolute;
  font-weight: bold;
  right: 20px;
  color: white;
  z-index: 1000;
  font-size: 1.6em;
  cursor: pointer;
`;

/**
 * COMPONENT
 */

const Header = (props) => {
  const {
    showMenu, isLoggedIn, handleLogout, toggleMenu,
  } = props;
  return (
    <MobileHeaderContainer>
      <Logo mobile="true" />
      <ToggleContainer onClick={toggleMenu}>
        {!showMenu && <FontAwesomeIcon icon={faBars} />}
      </ToggleContainer>
      {showMenu && (
        <Navigation toggleMenu={toggleMenu} handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      )}
    </MobileHeaderContainer>
  );
};

export default withTheme(Header);
