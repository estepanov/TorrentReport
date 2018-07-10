import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { darken } from 'polished';
import SVGbase from './SVGbase';
import SVGhover from './SVGhover';

/**
 * STYLED
 */

const BuiltByContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
  align-items: center;
  justify-content: center;
`;

const StyledBuiltBy = styled.div`
  color: ${props => darken(0.2, props.theme.footer.backgroundColor)};
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 900;
  letter-spacing: 2px;
  font-size: 1em;
  margin-bottom: 5px;
`;

const StyledA = styled.a`
  padding: 0;
  margin: 0;
  color: ${props => darken(0.2, props.theme.footer.backgroundColor)};
  text-decoration: none;
  font-size: 0.9em;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  letter-spacing: 3px;
  &:visited {
    color: ${props => darken(0.2, props.theme.footer.backgroundColor)};
  }
`;

/**
 * COMPONENT
 */

class BuiltBy extends Component {
  constructor(props) {
    super(props);

    this.element = React.createRef();
    this.state = {
      hover: false,
      height: '50px',
      width: '110px',
      style: { fill: 'black' },
      styleHover: { fill: '#26ade4' },
    };
  }

  onMouseEnterHandler = () => {
    this.setState({ hover: true });
  };
  onMouseLeaveHandler = () => {
    this.setState({ hover: false });
  };

  render() {
    const {
      height, width, style, styleHover,
    } = this.state;
    return (
      <BuiltByContainer
        innerRef={this.element}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        {!this.state.hover && <StyledBuiltBy>BUILT BY</StyledBuiltBy>}
        <StyledA href="http://estepanov.io">
          {this.state.hover ? (
            <SVGhover style={styleHover} height={height} width={width} />
          ) : (
            <SVGbase style={style} height={height} width={width} />
          )}
        </StyledA>
      </BuiltByContainer>
    );
  }
}

export default withTheme(BuiltBy);
