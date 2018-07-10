import React from 'react';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

const StyledContent = styled.div`
  background-color: white;
  font-family: ${props => props.theme.fonts.header};
  color: ${props => darken(0.95, props.theme.colors.quaternary)};
  padding: 2em;
  @media (max-width: ${props => props.theme.mobile.width}) {
    padding: 1em;
  }
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  & > a {
    color: ${props => lighten(0.01, props.theme.colors.tertiary)};
    text-decoration: underline;
    &:hover {
      color: ${props => darken(0.25, props.theme.colors.tertiary)};
      text-decoration: none;
    }
    &:visited {
      color: ${props => darken(0.01, props.theme.colors.tertiary)};
    }
  }
`;

const ContentRender = props => <StyledContent>{props.children}</StyledContent>;

export default withTheme(ContentRender);
