import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import PageButton from './pageButton';

const Pagination = styled.div`
  margin: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Spacer = styled.div`
  min-width: 30px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  letter-spacing: 2px;
  color: ${props => lighten(0.74, props.theme.colors.quinary)};
`;

const PageButtonMaker = (props) => {
  const {
    numberOfPages, currentPage, changePageFunc, funcToCall,
  } = props;
  const pageButtons = [];
  const firstShownPageButton = currentPage <= 3 ? 0 : currentPage - 3;
  let lastShownPageButton;
  if (currentPage + 4 >= numberOfPages) {
    lastShownPageButton = numberOfPages;
  } else if (currentPage <= 4) {
    lastShownPageButton = 6;
  } else {
    lastShownPageButton = currentPage + 4;
  }

  if (currentPage >= 1) {
    pageButtons.push(<PageButton
      key={'pagination-previous-button'}
      pageNumber={currentPage - 1}
      buttonText="Previous"
      changePageFunc={changePageFunc}
      funcToCall={funcToCall}
    />);
  }

  if (firstShownPageButton >= 1) {
    pageButtons.push(<PageButton
      key={'pagination-first-button'}
      pageNumber={0}
      changePageFunc={changePageFunc}
      funcToCall={funcToCall}
    />);
    if (firstShownPageButton > 1) {
      pageButtons.push(<Spacer key="pagination-first-spacer">...</Spacer>);
    }
  }

  for (let x = firstShownPageButton; x < lastShownPageButton; x += 1) {
    pageButtons.push(<PageButton
      key={`page-button-${x}`}
      active={currentPage === x}
      pageNumber={x}
      changePageFunc={changePageFunc}
      funcToCall={funcToCall}
    />);
  }

  if (lastShownPageButton < numberOfPages - 1) {
    if (lastShownPageButton + 1 !== numberOfPages - 1) {
      pageButtons.push(<Spacer key="pagination-last-spacer">...</Spacer>);
    }
    pageButtons.push(<PageButton
      key={'pagination-last-button'}
      pageNumber={numberOfPages - 1}
      changePageFunc={changePageFunc}
      funcToCall={funcToCall}
    />);
  }

  if (currentPage !== numberOfPages - 1) {
    pageButtons.push(<PageButton
      key={'pagination-next-button'}
      pageNumber={currentPage + 1}
      buttonText="Next"
      changePageFunc={changePageFunc}
      funcToCall={funcToCall}
    />);
  }
  return <Pagination>{pageButtons}</Pagination>;
};

export default PageButtonMaker;
