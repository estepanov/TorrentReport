import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faUpload } from '@fortawesome/fontawesome-free-solid';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';

import ToolTip from '../tooltip/child';

/**
 * STYLED
 */

const ItemLink = styled(Link)`
  display: inline-flex;
  border-bottom: 1px solid ${props => lighten(0.92, props.theme.colors.quinary)};
  align-items: center;
  font-family: ${props => props.theme.fonts.header};
  padding: 5px 0px 5px 0px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  text-decoration: none;
  color: ${props => lighten(0.4, props.theme.colors.quinary)};
  opacity: 0.7;
  &:hover {
    opacity: 1;
    color: ${props => lighten(0.3, props.theme.colors.quinary)};
  }
  &:last-child {
    border-bottom: none;
  }
`;

const Number = styled.div`
  background-color: ${props => lighten(0.8, props.theme.colors.quinary)};
  padding: 3px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  font-size: 1em;
  font-family: monospace;
  margin-right: 10px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  @media (max-width: ${props => props.theme.mobile.width}) {
    flex-direction: column;
  }
`;

const Name = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: wrap;
  padding: 5px 0 5px 0;
`;

const GroupHolder = styled.div`
  padding: 5px 0 5px 0;
  margin: 0;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SeedLeech = styled.div`
  width: 4em;
  margin-right: 1em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${props => props.theme.colors[props.colsel || 'quinary']};
  opacity: 0.65;
  flex-shrink: 0;
  svg {
    margin-right: 10px;
  }
`;

const UploadDate = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  color: ${props => lighten(0.55, props.theme.colors.quinary)};
  font-style: italic;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 10.5em;
  svg {
    margin-right: 10px;
  }
`;

/**
 * COMPONENT
 */
const listItem = (props) => {
  const { name, id, Infos } = props.item;
  const seed = Infos.reduce((acc, curr) => acc + curr.seed, 0);
  const leech = Infos.reduce((acc, curr) => acc + curr.leech, 0);
  const earliestUpload = Infos.reduce(
    (earliestDate, currInfo) =>
      (new Date(currInfo.uploadDate) < earliestDate ? new Date(currInfo.uploadDate) : earliestDate),
    new Date(),
  );

  return (
    <ItemLink alt={name} to={`/listing/${id}`}>
      <Number>{props.index + 1}</Number>
      <InfoContainer>
        <Name>{name}</Name>
        <GroupHolder>
          <SeedLeech colsel="seed">
            <FontAwesomeIcon icon={faCaretUp} />
            {seed}
          </SeedLeech>
          <SeedLeech colsel="leech">
            <FontAwesomeIcon icon={faCaretDown} />
            {leech}
          </SeedLeech>
          <UploadDate>
            <ToolTip message="Date of torrent upload">
              <FontAwesomeIcon icon={faUpload} />
            </ToolTip>{' '}
            {`${moment(earliestUpload).fromNow()} `}
          </UploadDate>
        </GroupHolder>
      </InfoContainer>
    </ItemLink>
  );
};

export default withTheme(listItem);
