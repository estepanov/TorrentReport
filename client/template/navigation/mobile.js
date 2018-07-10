import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css, withTheme } from 'styled-components';
import { lighten, darken } from 'polished';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from '@fortawesome/fontawesome-free-solid';

/**
 * STYLES
 */

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.96);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const ToggleContainer = styled.div`
  position: absolute;
  font-weight: bold;
  right: 0.5em;
  top: 1em;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.header};
  padding: 0.3em 0.6em 0.3em 0.6em;
  border: solid 3px ${props => props.theme.colors.primary};
  z-index: 1000;
  font-size: 1.3em;
  cursor: pointer;
  &:hover {
    color: ${props => lighten(0.2, props.theme.colors.primary)};
    border: solid 3px ${props => lighten(0.2, props.theme.colors.primary)};
  }
`;

const Menu = styled.div`
  margin: 1.5em;
  font-family: ${props => props.theme.fonts.header};
  flex-grow: 1;
`;

const SubMenu = styled.div`
  margin: 0 0 0 2em;
  flex-grow: 1;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 0;
  border-bottom: solid 1px ${props => lighten(0.2, props.theme.colors.quinary)};
`;

const MenuLink = styled(Link)`
  font-size: 1.6em;
  font-weight: bold;
  padding: 0;
  margin: 0;
  color: white;
  text-decoration: none;
  &:visited {
    color: white;
  }
  &:hover {
    color: ${props => darken(0.1, props.theme.colors.primary)};
  }
`;

const SubMenuLink = MenuLink.extend`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  color: ${props => darken(0.3, props.theme.colors.quaternary)};
  text-decoration: none;
  &:visited {
    color: ${props => darken(0.3, props.theme.colors.quaternary)};
  }
  &:hover {
    color: ${props => darken(0.1, props.theme.colors.secondary)};
  }
`;

const Action = css`
  color: ${props => lighten(0.1, props.theme.colors[props.selcol])};
  &:hover {
    color: ${props => darken(0.7, props.theme.colors[props.selcol])};
    background-color: ${props => lighten(0.05, props.theme.colors[props.selcol])};
    text-shadow: 0 1px ${props => darken(0.01, props.theme.colors[props.selcol])};
    border-bottom: solid 1px ${props => lighten(0.05, props.theme.colors[props.selcol])};
  }
  text-transform: uppercase;
  text-shadow: 0 3px ${props => darken(0.5, props.theme.colors[props.selcol])};
  margin: 10px 0px 10px 10px;
  text-decoration: none;
  font-size: 1.1em;
  padding: 0.9em;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  & svg {
    margin: 0 15px 0 0;
  }
`;

const ActionLink = styled(Link)`
  ${Action} &:active {
    color: ${props => darken(0.35, props.theme.colors[props.selcol])};
    transform: translateY(1px);
  }
`;

const ActionButton = styled.div`
  cursor: pointer;
  ${Action};
  border: none;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 1em 0.5em 1em 0.5em;
  height: ${props => props.theme.header.height};
`;

/**
 * COMPONENT
 */

const MobileNavigation = (props) => {
  const { handleLogout, isLoggedIn, toggleMenu } = props;
  return (
    <Cover>
      <ToggleContainer onClick={toggleMenu}>
        <FontAwesomeIcon icon={faTimes} />
      </ToggleContainer>
      <Menu>
        <Item>
          <MenuLink onClick={toggleMenu} to="/top">
            Torrents
          </MenuLink>
          <SubMenu>
            <SubMenuLink onClick={toggleMenu} to="/top">
              Current Torrents
            </SubMenuLink>
            <SubMenuLink onClick={toggleMenu} to="/new/listings">
              New Torrents
            </SubMenuLink>
          </SubMenu>
        </Item>
        <Item>
          <MenuLink onClick={toggleMenu} to="/about">
            About
          </MenuLink>
        </Item>
        {isLoggedIn && (
          <Item>
            <MenuLink onClick={toggleMenu} to="/account">
              Account
            </MenuLink>
          </Item>
        )}
        {!isLoggedIn ? (
          <ActionContainer>
            <ActionLink to="/signup" onClick={toggleMenu} selcol="primary">
              <FontAwesomeIcon icon={faUserPlus} />Register
            </ActionLink>
            <ActionLink to="/login" onClick={toggleMenu} selcol="secondary">
              <FontAwesomeIcon icon={faSignInAlt} />Login
            </ActionLink>
          </ActionContainer>
        ) : (
          <ActionContainer>
            <ActionButton onClick={handleLogout} selcol="tertiary">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </ActionButton>
          </ActionContainer>
        )}
      </Menu>
    </Cover>
  );
};

export default withTheme(MobileNavigation);
