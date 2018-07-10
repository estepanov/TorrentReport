import React from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';
import config from '../../config';

/**
 * STYLED
 */

const LogoContainer = styled.div`
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.header.logo};
  ${props => props.mobile && 'transform: translate(0em, -0.3em);'};
`;

const LogoText = styled(Link)`
  font-weight: 700;
  font-family: ${props => props.theme.fonts.logo};
  text-decoration: none;
  font-size: 1.6em;
  color: ${props => props.theme.colors.header.logo};
  &:visited {
    color: ${props => props.theme.colors.header.logo};
  }
`;

const BrandBar = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => darken(0.35, props.theme.colors.primary)};
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 0.9em;
  height: 1.2em;
  width: 16em;
  transform: translate(0em, 2.3em);
  font-family: monospace;
  padding: 2px;
  line-height: 0.9em;
  letter-spacing: 2px;
`;

/**
 * COMPONENT
 */

const Logo = (props) => {
  const { mobile } = props;
  return (
    <LogoContainer mobile={mobile}>
      <LogoText mobile={mobile} to="/">
        Torrent Report
      </LogoText>
      <BrandBar mobile={mobile}>{config.version.name()}</BrandBar>
    </LogoContainer>
  );
};

export default withTheme(Logo);
