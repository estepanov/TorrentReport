import React from 'react';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

const Button = styled.div`
  min-width: 30px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  ${props =>
    (props.active
      ? `
          border: solid 1px ${lighten(0.2, props.theme.colors.primary)};
          color: ${darken(0.2, props.theme.colors.primary)};
          background-color: ${lighten(0.2, props.theme.colors.primary)};
        `
      : `
          cursor: pointer;
          color: ${lighten(0.74, props.theme.colors.quinary)};
          &:hover {
            background-color: ${lighten(0.95, props.theme.colors.quinary)};
          }
        `)};
`;

const PageButton = (props) => {
  const {
    pageNumber, changePageFunc, funcToCall, active, buttonText,
  } = props;
  return (
    <Button
      active={active}
      onClick={() => {
        if (typeof funcToCall === 'function') funcToCall();
        return changePageFunc(pageNumber);
      }}
    >
      {buttonText || pageNumber + 1}
    </Button>
  );
};

export default withTheme(PageButton);
