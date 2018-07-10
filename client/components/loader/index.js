import React from 'react';
import Loading from 'react-loading-components';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';

import randomString from './random';
/**
 * STYLES
 */

const Holder = styled.div`
  opacity: 0.3;
  padding: 2px;
  margin: 0px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LoadingText = styled.div`
  margin: 0px;
  font-size: 2em;
  font-family: ${props => props.theme.fonts.logo};
  color: ${props => lighten(0.3, props.theme.colors.quinary)};
  padding-top: 1.5em;
  font-weight: 900;
  text-transform: uppercase;
`;

/**
 * COMPONENT
 */

const Loader = (props) => {
  let {
    width, height, type, fill, message,
  } = props;
  if (!width) width = 110;
  if (!height) height = 110;
  if (!type) type = 'ball_triangle';
  fill = 'black';
  if (message === 'random') message = randomString();
  return (
    <Holder>
      <Loading type={type} width={width} height={height} fill={fill} />
      {message && <LoadingText>{message}</LoadingText>}
    </Holder>
  );
};

export default withTheme(Loader);
