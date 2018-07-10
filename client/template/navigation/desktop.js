import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/fontawesome-free-solid';
import styled, { css, withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

/**
 * STYLES
 */

const Menu = styled.div`
  height: ${props => props.theme.header.height};
  display: flex;
  flex-flow: row;
  flex-wrap: none;
  font-size: 14px;
  float: left;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
`;

const SubMenu = styled.div`
  display: none;
  background-color: ${props => lighten(0.15, props.theme.colors.header.background)};
  top: ${props => props.theme.header.height};
  position: absolute;
  float: left;
  overflow: hidden;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
`;

const Item = styled.div`
  display: inline-flex;
  flex-wrap: none;
  height: ${props => props.theme.header.height};
  text-transform: uppercase;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  &:hover > ${SubMenu} {
    display: block;
  }
  &:hover {
    background-color: ${props => darken(0.05, props.theme.colors.secondary)};
    text-shadow: 0 1px ${props => darken(0.6, props.theme.colors.secondary)};
  }
`;

const MenuLink = styled(Link)`
  height: ${props => props.theme.header.height};
  padding: 0 20px 0 20px;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${props => darken(0.1, props.theme.colors.secondary)};
    text-shadow: 0 1px ${props => darken(0.6, props.theme.colors.secondary)};
  }
  &:visited {
    color: #ffffff;
  }
`;

const SubMenuLink = MenuLink.extend`
  height: ${props => props.theme.header.submenu.height};
  padding: 0 20px 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
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
  font-size: 0.7em;
  padding: 0.9em;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  & svg {
    margin: 0 6px 0 0;
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
  height: ${props => props.theme.header.height};
`;

/**
 * COMPONENT
 */

const DesktopNavigation = (props) => {
  const { handleLogout, isLoggedIn } = props;
  return (
    <Menu>
      <Item>
        <MenuLink to="/top">Torrents</MenuLink>
        <SubMenu>
          <SubMenuLink to="/top">Current Torrents</SubMenuLink>
          <SubMenuLink to="/new/listings">New Torrents</SubMenuLink>
        </SubMenu>
      </Item>
      {isLoggedIn && (
        <Item>
          <MenuLink to="/account">Account</MenuLink>
        </Item>
      )}
      {!isLoggedIn ? (
        <ActionContainer>
          <ActionLink to="/signup" selcol="primary">
            <FontAwesomeIcon icon={faUserPlus} />Register
          </ActionLink>
          <ActionLink to="/login" selcol="secondary">
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
  );
};

export default withTheme(DesktopNavigation);
