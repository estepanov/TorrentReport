import React from 'react';
import styled from 'styled-components';
import { lighten, darken } from 'polished';

const lightOrDark = (props) => {
  const amount = props.amount || 0;
  const color = props.themeColor ? props.theme.colors[props.themeColor] : props.color;
  if (props.lighten) {
    return lighten(amount, color);
  }
  if (props.darken) {
    return darken(amount, color);
  }
  return color;
};

const Container = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent || 'center'};
  align-items: ${props => props.alignItems || 'center'};
  flex-grow: 1;
  font-style: italic;
  color: ${props => lightOrDark(props)};
`;

const noNewTorrents = props => <Container {...props}>{props.message}</Container>;

export default noNewTorrents;
