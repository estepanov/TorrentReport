import React from 'react';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';

const Header = styled.div`
  font-size: 1.3em;
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.logo};
  margin: 1em 0em 0em 0em;
  font-weight: bold;
  color: ${props => lighten(0.5, props.theme.colors.quinary)};
`;

const SectionHeader = props => <Header>{props.children}</Header>;

export default withTheme(SectionHeader);
