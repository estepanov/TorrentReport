import React from 'react';
import styled, { withTheme } from 'styled-components';
/**
 * STYLES
 */

const ListingName = styled.div`
  font-size: 2em;
  font-family: ${props => props.theme.fonts.header};
  margin: 0em 0em 1em 0em;
`;

/**
 * COMPONENT
 */

const ListingHeader = props => <ListingName>{props.children}</ListingName>;

export default withTheme(ListingHeader);
