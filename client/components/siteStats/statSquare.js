import React from 'react';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';
import Loader from '../loader';

const Square = styled.div`
  background-color: ${props => lighten(0.98, props.theme.colors.quinary)};
  min-height: 4em;
  margin: 5px;
  padding: 5px;
  flex-grow: 1;
  min-width: 140px;
  min-height: 140px;
  flex-basis: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${props => props.theme.fonts.header};
`;

const Value = styled.div`
  padding: 3px;
  font-size: 1.6em;
  color: ${props => lighten(0.4, props.theme.colors.quinary)};
  text-transform: uppercase;
  position: relative;
  top: -0.7em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn ease-in 1s;
  @media screen and (max-width: 400px) {
    font-size: 1.3em !important;
  }
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0.8em;
  font-size: 0.9em;
  color: ${props => lighten(0.65, props.theme.colors.quinary)};
  text-transform: uppercase;
  text-align: center;
  @media screen and (max-width: 400px) {
    font-size: 0.8em !important;
  }
`;

/**
 * COMPONENT
 */
const StatSquare = (props) => {
  const { name, shorten } = props;
  let { value } = props;
  const showLoad = !value;
  if (shorten) {
    const divThousand = value / 1000;
    if (divThousand >= 1) value = `${Math.round(divThousand * 100) / 100}k`;
  }

  return (
    <Square>
      <Value>{showLoad ? <Loader type="three_dots" height={50} width={50} /> : value}</Value>
      <Name>{name}</Name>
    </Square>
  );
};

export default withTheme(StatSquare);
