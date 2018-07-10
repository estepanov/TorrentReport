import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/fontawesome-free-solid';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';

const ToolTip = styled.div`
  display: flex;
  cursor: help;
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

const Text = styled.div`
  text-align: center;
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  font-size: 14px;
  text-shadow: 1px 1px ${props => lighten(0.35, props.theme.colors.quinary)};
`;
const BasicToolTip = props => (
  <ToolTip>
    <OnHover>
      <FontAwesomeIcon icon={faQuestionCircle} />
    </OnHover>
    <Message>
      <Text>{props.message}</Text>
    </Message>
  </ToolTip>
);

export default withTheme(BasicToolTip);
