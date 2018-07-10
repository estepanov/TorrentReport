import React from 'react';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

import Logo from './logo';
import Navigation from '../navigation/desktop';

/**
 * STYLES
 */

const StyledHeader = styled.div`
  background-color: ${props => props.theme.colors.header.background};
  height: ${props => props.theme.header.height};
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 40px 0px 40px;
  margin: 0px;
`;

const Spacer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
`;

/**
 * COMPONENT
 */

const Header = (props) => {
  const { isLoggedIn, handleLogout } = props;
  return (
    <StyledHeader>
      <Logo />
      <Spacer />
      <Navigation handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
    </StyledHeader>
  );
};

export default withTheme(Header);
