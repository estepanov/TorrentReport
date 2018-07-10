import React from 'react';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';

const Header = styled.div`
  letter-spacing: 2px;
  font-family: ${props => props.theme.fonts.header};
  font-size: 2em;
  flex-basis: auto;
  color: ${props => lighten(0.5, props.theme.colors.quinary)};
  padding: 0 0 20px 0;
`;

const PageHeader = props => <Header>{props.children}</Header>;

export default withTheme(PageHeader);
