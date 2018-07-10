import React from 'react';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';
/**
 * Style
 */
const ToolTip = styled.div`
  display: flex;
  cursor: help;
`;

const Text = styled.div`
  text-align: center;
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  font-size: 1em;
  text-shadow: 1px 1px ${props => lighten(0.2, props.theme.colors.quinary)};
`;
const Message = styled.div`
  display: none;
`;
const OnHover = styled.div`
  &:hover + ${Message} {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10;
    background-color: ${props => lighten(0.45, props.theme.colors.quinary)};
    width: 12em;
    padding: 15px;
    transform: translate(-12em, 1.2em);
    color: white;
    text-transform: initial;
    line-height: 1.5em;
    opacity: 0.94;
  }
`;
/**
 * COMPONENT
 */

const BasicToolTip = props => (
  <ToolTip>
    <OnHover>{props.children}</OnHover>
    <Message>
      <Text>{props.message}</Text>
    </Message>
  </ToolTip>
);

export default withTheme(BasicToolTip);
